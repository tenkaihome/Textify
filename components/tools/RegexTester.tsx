"use client";
import React, { useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState("");

  const getMatches = () => {
    if (!pattern) return [];
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({ value: match[0], index: match.index });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({ value: match[0], index: match.index });
        }
      }
      return matches;
    } catch (e: any) {
      return [];
    }
  };

  const validateRegex = () => {
    try {
      new RegExp(pattern, flags);
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  const matches = getMatches();

  return (
    <div className="flex flex-col h-full gap-4 p-6 min-h-[600px]">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <label className="text-sm font-medium text-gray-400 mb-2 block">Regular Expression</label>
          <div className="flex">
            <span className="bg-[#333] border border-[#444] border-r-0 rounded-l-md px-3 py-2 text-gray-400 flex items-center">/</span>
            <input
              type="text"
              className="flex-1 bg-[#111] border border-[#333] px-3 py-2 text-gray-200 focus:outline-none font-mono"
              value={pattern}
              onChange={(e) => {
                setPattern(e.target.value);
                validateRegex();
              }}
              placeholder="pattern"
            />
            <span className="bg-[#333] border border-[#444] border-l-0 px-3 py-2 text-gray-400 flex items-center">/</span>
            <input
              type="text"
              className="w-16 bg-[#111] border border-[#333] border-l-0 rounded-r-md px-3 py-2 text-gray-400 focus:outline-none font-mono"
              value={flags}
              onChange={(e) => {
                setFlags(e.target.value);
                validateRegex();
              }}
              placeholder="flags"
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 mt-4">
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2">Test String</label>
          <textarea
            className="flex-1 bg-[#111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-blue-500/50 resize-none"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter string to test..."
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-2 flex justify-between">
            <span>Matches</span>
            {pattern && !error && (
              <span className="bg-[#2a3028] text-green-500 px-2 py-0.5 rounded-full text-xs border border-green-900/50">
                {matches.length} found
              </span>
            )}
          </label>
          <div className="flex-1 bg-[#111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 overflow-y-auto">
            {!pattern ? (
              <span className="text-gray-600">Enter a pattern to see results...</span>
            ) : error ? (
              <span className="text-red-500/50">Fix the regex error.</span>
            ) : matches.length === 0 ? (
              <span className="text-gray-500">No matches found.</span>
            ) : (
              <div className="space-y-2">
                {matches.map((m, i) => (
                  <div key={i} className="bg-[#222] border border-[#444] rounded p-2 flex items-start gap-3">
                    <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span>
                    <span className="break-all">{m.value}</span>
                    <span className="text-gray-500 text-xs ml-auto shrink-0 mt-0.5">Index: {m.index}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
