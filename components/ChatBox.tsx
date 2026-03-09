"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ShieldCheck, User, ArrowLeft, Users } from "lucide-react";
import { ref, push, set, onValue, query as rtdbQuery, orderByChild, limitToLast, serverTimestamp, remove } from "firebase/database";
import { db } from "@/lib/firebase";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [allMessages, setAllMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("Guest");
  const [selectedChatterId, setSelectedChatterId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasUnread, setHasUnread] = useState(false);

  // Initialize local user data
  useEffect(() => {
    let storedId = localStorage.getItem("devsphere_chat_id");
    if (!storedId) {
      storedId = "user_" + Math.random().toString(36).substring(2, 9);
      localStorage.setItem("devsphere_chat_id", storedId);
    }
    setUserId(storedId);

    const savedAdmin = localStorage.getItem("devsphere_is_admin") === "true";
    setIsAdmin(savedAdmin);

    if (savedAdmin) {
      setUserName("Admin");
    } else {
      let storedName = localStorage.getItem("devsphere_chat_name");
      if (!storedName) {
        storedName = "Guest_" + Math.floor(Math.random() * 1000);
        localStorage.setItem("devsphere_chat_name", storedName);
      }
      setUserName(storedName);
    }
  }, []);

  // Centralized Firebase Listener (Fetches latest 200 messages to avoid composite indexing issues)
  useEffect(() => {
    const q = rtdbQuery(ref(db, "support_chat"), orderByChild("createdAt"), limitToLast(200));
    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setAllMessages([]);
        return;
      }

      const fetched = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })).sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0)); // Oldest first

      setAllMessages(fetched);

      if (!isOpen && fetched.length > 0) {
        const lastMsg = fetched[fetched.length - 1];
        // If it's a guest, they have unread if the last message in their room is from admin
        if (!isAdmin) {
          const myLatest = fetched.filter((m: any) => m.chatterId === userId).pop();
          if (myLatest && myLatest.senderId !== userId) {
            setHasUnread(true);
          }
        } else {
          // If it's admin, they have unread if the last message globally is from a guest
          if (!lastMsg.isAdmin) {
            setHasUnread(true);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [isOpen, userId, isAdmin]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isOpen, allMessages, selectedChatterId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text) return;

    if (text === "/iamadmin30345") {
      setIsAdmin(true);
      setUserName("Admin");
      localStorage.setItem("devsphere_is_admin", "true");
      setNewMessage("");
      return;
    }

    if (text === "/logoutadmin") {
      setIsAdmin(false);
      setUserName("Guest");
      localStorage.setItem("devsphere_is_admin", "false");
      setSelectedChatterId(null);
      setNewMessage("");
      return;
    }

    const targetChatterId = isAdmin ? selectedChatterId : userId;
    if (!targetChatterId && isAdmin) return; // Admin must select a user first

    setNewMessage("");

    try {
      const newMessageRef = push(ref(db, "support_chat"));
      await set(newMessageRef, {
        text,
        senderId: userId,
        senderName: userName,
        chatterId: targetChatterId, // Grouping ID for 1-on-1 chat
        isAdmin,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.error("Error sending message to Firebase", e);
    }
  };

  const handleDeleteChat = async (e: React.MouseEvent, targetChatterId: string) => {
    e.stopPropagation();
    if (!window.confirm("This action will delete the entire chat history for this conversation. Are you sure?")) return;
    
    try {
      const messagesToDelete = allMessages.filter(m => m.chatterId === targetChatterId);
      for (const msg of messagesToDelete) {
        if (msg.id) {
          await remove(ref(db, `support_chat/${msg.id}`));
        }
      }
      if (selectedChatterId === targetChatterId) {
        setSelectedChatterId(null);
      }
    } catch (err) {
      console.error("Error deleting chat", err);
    }
  };

  // derived state
  const displayedMessages = allMessages.filter(m => m.chatterId === (isAdmin ? selectedChatterId : userId));

  // Admin active chats list
  const activeChatsMap = new Map();
  if (isAdmin) {
    allMessages.forEach(msg => {
      if (msg.chatterId) {
        activeChatsMap.set(msg.chatterId, msg); // Continually overwrites, keeping the latest msg per chatterId
      }
    });
  }
  const activeChats = Array.from(activeChatsMap.values()).reverse(); // Newest active on top

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Search / Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-xl transition-transform hover:scale-105 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {hasUnread && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#111] rounded-full animate-pulse"></span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#1a1a1a] border border-[#333] w-[350px] sm:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">

          {/* Header */}
          <div className="bg-[#222] border-b border-[#333] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isAdmin && selectedChatterId ? (
                <button onClick={() => setSelectedChatterId(null)} className="text-gray-400 hover:text-white mr-1 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  {isAdmin ? <Users className="w-5 h-5 text-blue-500" /> : <MessageCircle className="w-5 h-5 text-blue-500" />}
                </div>
              )}

              <div>
                <h3 className="text-white font-semibold text-[15px]">
                  {isAdmin
                    ? (selectedChatterId ? "Chatting with User" : "Admin Dashboard")
                    : "Support Chat"}
                </h3>
                <p className="text-xs text-green-500">{isAdmin ? "Admin Mode" : "Online"}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white bg-[#333] hover:bg-[#444] rounded-full p-2 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Admin Chat List View */}
          {isAdmin && !selectedChatterId ? (
            <div className="flex-1 overflow-y-auto p-2 no-scrollbar bg-[#111]">
              <div className="text-xs font-bold text-gray-500 uppercase px-3 py-3 tracking-wider">Active Conversations</div>
              {activeChats.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-10">No users have started a chat yet.</div>
              )}
              {activeChats.map(chat => {
                const chatterName = allMessages.find(m => m.senderId === chat.chatterId)?.senderName || "Unknown User";
                const isUnread = !chat.isAdmin && chat.senderId !== userId;
                return (
                  <div
                    key={chat.chatterId}
                    onClick={() => setSelectedChatterId(chat.chatterId)}
                    className="flex justify-between items-center p-3 mb-1 bg-[#1a1a1a] hover:bg-[#222] border border-[#222] hover:border-[#333] cursor-pointer rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <User className="w-8 h-8 p-1.5 bg-[#333] text-gray-400 rounded-full shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors" />
                      <div className="flex flex-col truncate">
                        <span className="text-gray-200 text-sm font-semibold truncate">{chatterName}</span>
                        <span className="text-gray-500 text-xs truncate max-w-[200px]">{chat.text}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isUnread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      <button 
                        onClick={(e) => handleDeleteChat(e, chat.chatterId)} 
                        className="text-gray-600 hover:text-red-500 hover:bg-[#333] p-1.5 rounded-full transition-colors"
                        title="Delete Chat"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <>
              {/* Messages Area - Either Guest or Admin 1-on-1 */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar bg-[#111]">
                {displayedMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                    <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p>{isAdmin ? "No messages yet." : "How can we help you today?"}</p>
                  </div>
                ) : (
                  displayedMessages.map((msg, i) => {
                    const isMe = msg.senderId === userId;
                    return (
                      <div key={msg.id || i} className={`max-w-[85%] flex flex-col ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                        {/* User badge */}
                        <div className="flex items-center gap-1 mb-1 px-1">
                          {msg.isAdmin ? (
                            <>
                              <ShieldCheck className="w-3 h-3 text-blue-400" />
                              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">{msg.senderName}</span>
                            </>
                          ) : (
                            <>
                              {!isMe && <User className="w-3 h-3 text-gray-500" />}
                              <span className="text-[11px] font-medium text-gray-500">{isMe ? "You" : msg.senderName}</span>
                            </>
                          )}
                        </div>

                        {/* Message bubble */}
                        <div className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${isMe
                            ? 'bg-blue-600 text-white rounded-tr-sm'
                            : msg.isAdmin
                              ? 'bg-[#222] border border-blue-500/30 text-gray-100 rounded-tl-sm'
                              : 'bg-[#222] border border-[#333] text-gray-200 rounded-tl-sm'
                          }`}>
                          {msg.text}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-[#1a1a1a] border-t border-[#333]">
                <form onSubmit={handleSend} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 bg-[#222] border border-[#333] rounded-full px-4 py-2.5 text-[14px] text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder={isAdmin ? "Replying to user..." : "Type a message..."}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || (isAdmin && !selectedChatterId)}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-[#333] disabled:text-gray-500 text-white rounded-full p-2.5 transition-colors flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                    </button>
                  </div>
                  <div className="text-center mt-1">
                    <span className="text-[10px] text-gray-500">
                      {isAdmin ? "Logged in as Admin (/logoutadmin to exit)" : ""}
                    </span>
                  </div>
                </form>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
