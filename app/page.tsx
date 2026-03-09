"use client";

import React, { useState } from "react";
import Header from "@/components/Header";

// Tool components
import JsonPrettify from "@/components/tools/JsonPrettify";
import JsonMinify from "@/components/tools/JsonMinify";
import RandomPort from "@/components/tools/RandomPort";
import RegexTester from "@/components/tools/RegexTester";
import NotImplemented from "@/components/tools/NotImplemented";
import ChmodCalculator from "@/components/tools/ChmodCalculator";
import JsonToCsv from "@/components/tools/JsonToCsv";
import SqlPrettify from "@/components/tools/SqlPrettify";
import YamlPrettify from "@/components/tools/YamlPrettify";
import XmlFormatter from "@/components/tools/XmlFormatter";
import EmailNormalizer from "@/components/tools/EmailNormalizer";
import CrontabGenerator from "@/components/tools/CrontabGenerator";
import DockerRunToCompose from "@/components/tools/DockerRunToCompose";
import GitCheatsheet from "@/components/tools/GitCheatsheet";
import RegexCheatsheet from "@/components/tools/RegexCheatsheet";
import LoremIpsum from "@/components/tools/LoremIpsum";

import { 
  GitBranch, Server, Clock, Braces, List, Database, 
  FileText, Box, CodeXml, AlignLeft, Mail, WholeWord,
  FileCode2, Type
} from "lucide-react";

const toolsList = [
  { id: "lorem-ipsum", name: "Lorem Ipsum", icon: <Type className="w-5 h-5 text-emerald-400" /> },
  { id: "json-prettify", name: "JSON Formatter", icon: <Braces className="w-5 h-5 text-emerald-400" /> },
  { id: "json-minify", name: "JSON Minifier", icon: <Braces className="w-5 h-5 text-emerald-400" /> },
  { id: "json-csv", name: "JSON to CSV", icon: <List className="w-5 h-5 text-emerald-400" /> },
  { id: "sql-prettify", name: "SQL Formatter", icon: <Database className="w-5 h-5 text-emerald-400" /> },
  { id: "xml-formatter", name: "XML Formatter", icon: <CodeXml className="w-5 h-5 text-emerald-400" /> },
  { id: "yaml-prettify", name: "YAML Formatter", icon: <AlignLeft className="w-5 h-5 text-emerald-400" /> },
  { id: "regex-tester", name: "Regex Tester", icon: <WholeWord className="w-5 h-5 text-emerald-400" /> },
  { id: "regex-cheatsheet", name: "Regex Cheatsheet", icon: <FileCode2 className="w-5 h-5 text-emerald-400" /> },
  { id: "random-port", name: "Port Generator", icon: <Server className="w-5 h-5 text-emerald-400" /> },
  { id: "crontab", name: "Crontab", icon: <Clock className="w-5 h-5 text-emerald-400" /> },
  { id: "chmod", name: "Chmod", icon: <FileText className="w-5 h-5 text-emerald-400" /> },
  { id: "docker-run-compose", name: "Docker Compose", icon: <Box className="w-5 h-5 text-emerald-400" /> },
  { id: "email-normalizer", name: "Email Normalizer", icon: <Mail className="w-5 h-5 text-emerald-400" /> },
  { id: "git-cheatsheet", name: "Git Cheatsheet", icon: <GitBranch className="w-5 h-5 text-emerald-400" /> },
];

export default function Home() {
  const [activeToolId, setActiveToolId] = useState("lorem-ipsum");

  const renderTool = () => {
    switch (activeToolId) {
      case "lorem-ipsum": return <LoremIpsum />;
      case "json-prettify": return <JsonPrettify />;
      case "json-minify": return <JsonMinify />;
      case "random-port": return <RandomPort />;
      case "regex-tester": return <RegexTester />;
      case "chmod": return <ChmodCalculator />;
      case "json-csv": return <JsonToCsv />;
      case "sql-prettify": return <SqlPrettify />;
      case "yaml-prettify": return <YamlPrettify />;
      case "xml-formatter": return <XmlFormatter />;
      case "email-normalizer": return <EmailNormalizer />;
      case "crontab": return <CrontabGenerator />;
      case "docker-run-compose": return <DockerRunToCompose />;
      case "git-cheatsheet": return <GitCheatsheet />;
      case "regex-cheatsheet": return <RegexCheatsheet />;
      default: return <NotImplemented />;
    }
  };

  const activeTool = toolsList.find(t => t.id === activeToolId);

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-slate-100 font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Grid Navigation */}
        <aside className="lg:col-span-1 border border-slate-800 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 shadow-xl shadow-emerald-900/10 h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Tools Menu</h2>
          <div className="flex flex-col gap-1.5">
            {toolsList.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeToolId === tool.id 
                    ? "bg-gradient-to-r from-emerald-500/20 to-transparent text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 border border-transparent"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${activeToolId === tool.id ? "bg-emerald-500/10" : "bg-slate-800"}`}>
                  {tool.icon}
                </div>
                {tool.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200">
              {activeTool?.name}
            </h1>
            <p className="text-slate-500 text-sm italic">Textify Utility Suite</p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-emerald-500/5 before:to-transparent before:pointer-events-none">
            {renderTool()}
          </div>
        </section>
      </main>
    </div>
  );
}
