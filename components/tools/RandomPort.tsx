"use client";
import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";

export default function RandomPort() {
  const [port, setPort] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const generateRandomPort = () => {
    // Standard random port range: 1024 - 65535
    const min = 1024;
    const max = 65535;
    const randomPort = Math.floor(Math.random() * (max - min + 1)) + min;
    setPort(randomPort);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (port) {
      navigator.clipboard.writeText(port.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    generateRandomPort();
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">Random Port Generator</h2>
      <p className="text-gray-400 mb-8 max-w-sm">
        Generate a random network port between 1024 and 65535, useful for testing microservices or resolving port conflicts.
      </p>

      <div className="bg-[#111111] border border-[#333] rounded-2xl p-10 flex flex-col items-center min-w-[320px] shadow-lg shadow-black/50">
        <div className="text-6xl font-mono text-white mb-8 tracking-wider font-bold">
          {port}
        </div>
        
        <div className="flex gap-4 w-full">
          <button
            onClick={generateRandomPort}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-600"
          >
            <RefreshCw className="w-4 h-4" />
            Generate New
          </button>
          <button
            onClick={copyToClipboard}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
