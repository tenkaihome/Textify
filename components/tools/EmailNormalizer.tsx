"use client";
import React, { useState } from "react";

export default function EmailNormalizer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const normalizeEmail = () => {
    try {
      if (!input.trim()) return;
      
      const email = input.trim().toLowerCase();
      let [localPart, domain] = email.split('@');
      
      if (!domain) {
        setOutput("Invalid email format");
        return;
      }

      // Normalize gmail.com specifically
      if (domain === 'gmail.com' || domain === 'googlemail.com') {
        domain = 'gmail.com';
        localPart = localPart.replace(/\./g, '');
        const plusIndex = localPart.indexOf('+');
        if (plusIndex !== -1) {
          localPart = localPart.substring(0, plusIndex);
        }
      }

      setOutput(`${localPart}@${domain}`);
    } catch (e) {
      setOutput("Error processing email");
    }
  };

  return (
    <div className="flex flex-col h-full md:flex-row gap-4 p-4 min-h-[600px]">
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Input Email Address</label>
        <textarea
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-green-500/50 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="User.Name+Tag@gmail.com"
        />
      </div>
      
      <div className="flex flex-col justify-center items-center py-4 md:py-0">
        <button 
          onClick={normalizeEmail}
          className="bg-[#2a3028] hover:bg-[#343e31] text-green-500 font-medium py-2 px-6 rounded-md transition-colors border border-green-900/30 whitespace-nowrap"
        >
          Normalize &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Normalized Email</label>
        <textarea
          readOnly
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none resize-none"
          value={output}
          placeholder="username@gmail.com"
        />
      </div>
    </div>
  );
}
