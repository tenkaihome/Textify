"use client";
import React, { useState, useEffect } from "react";

export default function ChmodCalculator() {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    public: { read: true, write: false, execute: true },
  });

  const [octal, setOctal] = useState("755");
  const [symbolic, setSymbolic] = useState("-rwxr-xr-x");

  const calculatePermissions = () => {
    const roles = ["owner", "group", "public"] as const;
    const values = { read: 4, write: 2, execute: 1 };
    
    let currentOctal = "";
    let currentSymbolic = "-";
    
    roles.forEach(role => {
      let score = 0;
      if (permissions[role].read) { score += values.read; currentSymbolic += "r"; } else currentSymbolic += "-";
      if (permissions[role].write) { score += values.write; currentSymbolic += "w"; } else currentSymbolic += "-";
      if (permissions[role].execute) { score += values.execute; currentSymbolic += "x"; } else currentSymbolic += "-";
      
      currentOctal += score.toString();
    });
    
    setOctal(currentOctal);
    setSymbolic(currentSymbolic);
  };

  useEffect(() => {
    calculatePermissions();
  }, [permissions]);

  const togglePermission = (role: "owner" | "group" | "public", type: "read" | "write" | "execute") => {
    setPermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [type]: !prev[role][type]
      }
    }));
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-8 gap-10">
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-between border-b border-[#333] pb-10">
        {(["owner", "group", "public"] as const).map(role => (
          <div key={role} className="flex-1 bg-[#111] border border-[#333] rounded-xl p-6 text-center shadow-lg">
            <h3 className="text-lg font-bold text-gray-200 capitalize mb-6">{role}</h3>
            
            <div className="flex flex-col gap-4 items-start w-max mx-auto">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-opacity-25 bg-[#222]"
                  checked={permissions[role].read}
                  onChange={() => togglePermission(role, "read")}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">Read (4)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-600 text-yellow-500 focus:ring-yellow-500 focus:ring-opacity-25 bg-[#222]"
                  checked={permissions[role].write}
                  onChange={() => togglePermission(role, "write")}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">Write (2)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-600 text-red-500 focus:ring-red-500 focus:ring-opacity-25 bg-[#222]"
                  checked={permissions[role].execute}
                  onChange={() => togglePermission(role, "execute")}
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">Execute (1)</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center max-w-2xl w-full">
        <div className="flex-1 bg-[#111] border border-[#444] rounded-xl p-8 flex flex-col items-center">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Octal</span>
          <span className="text-5xl font-mono text-green-400 font-bold">{octal}</span>
        </div>
        
        <div className="flex-[2] bg-[#111] border border-[#444] rounded-xl p-8 flex flex-col items-center">
          <span className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Symbolic</span>
          <span className="text-4xl font-mono text-blue-400 font-bold tracking-widest">{symbolic}</span>
        </div>
      </div>
    </div>
  );
}
