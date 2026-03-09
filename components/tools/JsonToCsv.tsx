"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convertToCsv = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      
      // Check if it's an array or object
      let dataToConvert = parsed;
      if (!Array.isArray(parsed)) {
        if (typeof parsed === 'object' && parsed !== null) {
          // Attempt to find an array property or wrap the object
          const arrayProps = Object.values(parsed).filter(val => Array.isArray(val));
          if (arrayProps.length > 0) {
            dataToConvert = arrayProps[0];
          } else {
            dataToConvert = [parsed];
          }
        }
      }

      const csv = Papa.unparse(dataToConvert);
      setOutput(csv);
      setError("");
    } catch (e) {
      setError("Invalid JSON format or unsupported structure for CSV conversion.");
    }
  };

  return (
    <div className="flex flex-col h-full md:flex-row gap-4 p-4 min-h-[600px]">
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Input JSON Array</label>
        <textarea
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-green-500/50 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='[{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]'
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      
      <div className="flex flex-col justify-center items-center py-4 md:py-0">
        <button 
          onClick={convertToCsv}
          className="bg-[#2a3028] hover:bg-[#343e31] text-green-500 font-medium py-2 px-6 rounded-md transition-colors border border-green-900/30 whitespace-nowrap"
        >
          Convert &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Output CSV</label>
        <textarea
          readOnly
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none resize-none"
          value={output}
          placeholder='id,name\n1,Alice\n2,Bob'
        />
      </div>
    </div>
  );
}
