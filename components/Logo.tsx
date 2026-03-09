import React from "react";
import { Globe } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 px-4 py-5 border-b border-[#333] select-none bg-[#1e1e1e]">
      <div className="bg-gradient-to-br from-[#3b82f6] to-[#4f46e5] p-2.5 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center border border-blue-400/20">
        <Globe className="w-5 h-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-tight text-white leading-none flex items-center gap-1">
          Dev<span className="text-blue-400">Sphere</span>
        </span>
        <span className="text-[9px] uppercase font-bold text-gray-500 tracking-[0.2em] mt-1.5">
          Pro Utilities
        </span>
      </div>
    </div>
  );
}
