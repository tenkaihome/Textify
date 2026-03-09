"use client";

import React, { useState } from "react";
import { Coffee, X, Type } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const donateUrl = "https://buymeacoffee.com/0xejebduoo"; 

  return (
    <>
      <header className="h-20 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 w-full shadow-lg">
        
        <div className="flex items-center gap-4 group cursor-pointer select-none">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all duration-300">
            <Type className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-1 group-hover:text-white transition-colors">
              Text<span className="text-emerald-400">ify</span>
            </span>
            <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-[0.3em]">
              Dev Tools Hub
            </span>
          </div>
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-2 px-5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
          >
            <Coffee className="w-5 h-5" />
            <span>Support</span>
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center z-[100] backdrop-blur-md p-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-800/50">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Coffee className="w-6 h-6 text-emerald-400" />
                Buy me a coffee
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center space-y-6">
              <p className="text-slate-400 text-center text-sm font-medium leading-relaxed">
                Tokens, servers, and coffee costs money! Help me keep Textify awesome.
              </p>
              
              <div className="bg-white p-5 rounded-2xl shadow-xl shadow-emerald-900/20">
                <QRCodeSVG value={donateUrl} size={180} />
              </div>
              
              <div className="w-full pt-4">
                <a
                  href={donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black tracking-wide py-4 px-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-1"
                >
                  Donate Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
