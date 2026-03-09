"use client";
import React, { useState } from "react";
import { format } from "sql-formatter";

export default function SqlPrettify() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatSql = () => {
    try {
      if (!input.trim()) return;
      const formatted = format(input, { language: 'sql', keywordCase: 'upper' });
      setOutput(formatted);
      setError("");
    } catch (e) {
      setError("Error formatting SQL query");
      setOutput("");
    }
  };

  return (
    <div className="flex flex-col h-full md:flex-row gap-4 p-4 min-h-[600px]">
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Minified SQL Query</label>
        <textarea
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-green-500/50 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="select id, name, email from users where age > 18 limit 10;"
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      
      <div className="flex flex-col justify-center items-center py-4 md:py-0">
        <button 
          onClick={formatSql}
          className="bg-[#2a3028] hover:bg-[#343e31] text-green-500 font-medium py-2 px-6 rounded-md transition-colors border border-green-900/30 whitespace-nowrap"
        >
          Format &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Formatted SQL</label>
        <textarea
          readOnly
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none resize-none"
          value={output}
          placeholder="Formatted query appears here..."
        />
      </div>
    </div>
  );
}
