"use client";
import React, { useState } from "react";

export default function DockerRunToCompose() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convertCommand = () => {
    if (!input.trim()) return;
    try {
      let image = "";
      const ports: string[] = [];
      const envs: string[] = [];
      
      const parts = input.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
      
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '-p' || parts[i] === '--publish') {
          ports.push(parts[i+1]);
        } else if (parts[i] === '-e' || parts[i] === '--env') {
          envs.push(parts[i+1]);
        } else if (i === parts.length - 1 && !parts[i].startsWith('-')) {
          image = parts[i];
        }
      }

      let compose = `version: '3.8'\nservices:\n  app:\n    image: ${image || 'image_name'}\n`;
      if (ports.length > 0) {
        compose += `    ports:\n`;
        ports.forEach(p => compose += `      - "${p.replace(/"/g, '')}"\n`);
      }
      if (envs.length > 0) {
        compose += `    environment:\n`;
        envs.forEach(e => compose += `      - ${e}\n`);
      }

      setOutput(compose);
    } catch {
      setOutput("Error converting command");
    }
  };

  return (
    <div className="flex flex-col h-full md:flex-row gap-4 p-4 min-h-[600px]">
      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Docker Run Command</label>
        <textarea
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-green-500/50 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="docker run -p 8080:80 -e NODE_ENV=production my-image"
        />
      </div>
      
      <div className="flex flex-col justify-center items-center py-4 md:py-0">
        <button 
          onClick={convertCommand}
          className="bg-[#2a3028] hover:bg-[#343e31] text-green-500 font-medium py-2 px-6 rounded-md transition-colors border border-green-900/30 whitespace-nowrap"
        >
          Convert &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <label className="text-sm font-medium text-gray-400 mb-2">Docker Compose YAML</label>
        <textarea
          readOnly
          className="flex-1 bg-[#111111] border border-[#333] rounded-lg p-4 text-sm font-mono text-gray-200 focus:outline-none resize-none"
          value={output}
          placeholder="version: '3.8'..."
        />
      </div>
    </div>
  );
}
