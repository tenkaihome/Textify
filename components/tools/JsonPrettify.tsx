"use client";
import React, { useState } from "react";

export default function JsonPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div className="flex flex-col h-full md:flex-row gap-4 p-4 min-h-[600px]">
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Input JSON</label>
        <textarea
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-green-500/50 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      
      <div className="flex flex-col justify-center items-center py-4 md:py-0">
        <button 
          onClick={formatJson}
          className="bg-[#2a3028] hover:bg-[#343e31] text-green-500 font-medium py-2 px-6 rounded-md transition-colors border border-green-900/30"
        >
          Format &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Prettified JSON</label>
        <textarea
          readOnly
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none resize-none"
          value={output}
          placeholder="Result will appear here..."
        />
      </div>
    </div>
  );
}
