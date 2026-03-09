import React from "react";
import Logo from "./Logo";
import { 
  GitBranch, 
  Server, 
  Clock, 
  Braces, 
  List, 
  Database, 
  FileText, 
  Box, 
  CodeXml, 
  AlignLeft, 
  Mail, 
  WholeWord,
  FileCode2,
  ChevronDown
} from "lucide-react";

export const toolsList = [
  { id: "git-cheatsheet", name: "Git cheatsheet", icon: <GitBranch className="w-5 h-5 text-gray-400" /> },
  { id: "random-port", name: "Random port generator", icon: <Server className="w-5 h-5 text-gray-400" /> },
  { id: "crontab", name: "Crontab generator", icon: <Clock className="w-5 h-5 text-gray-400" /> },
  { id: "json-prettify", name: "JSON prettify and format", icon: <Braces className="w-5 h-5 text-green-600" /> },
  { id: "json-minify", name: "JSON minify", icon: <Braces className="w-5 h-5 text-gray-400" /> },
  { id: "json-csv", name: "JSON to CSV", icon: <List className="w-5 h-5 text-gray-400" /> },
  { id: "sql-prettify", name: "SQL prettify and format", icon: <Database className="w-5 h-5 text-gray-400" /> },
  { id: "chmod", name: "Chmod calculator", icon: <FileText className="w-5 h-5 text-gray-400" /> },
  { id: "docker-run-compose", name: "Docker run to Docker c...", icon: <Box className="w-5 h-5 text-gray-400" /> },
  { id: "xml-formatter", name: "XML formatter", icon: <CodeXml className="w-5 h-5 text-gray-400" /> },
  { id: "yaml-prettify", name: "YAML prettify and format", icon: <AlignLeft className="w-5 h-5 text-gray-400" /> },
  { id: "email-normalizer", name: "Email normalizer", icon: <Mail className="w-5 h-5 text-gray-400" /> },
  { id: "regex-tester", name: "Regex Tester", icon: <WholeWord className="w-5 h-5 text-gray-400" /> },
  { id: "regex-cheatsheet", name: "Regex cheatsheet", icon: <FileCode2 className="w-5 h-5 text-gray-400" /> },
];

export default function Sidebar({ activeToolId, setActiveToolId }: { activeToolId: string, setActiveToolId: (id: string) => void }) {
  return (
    <aside className="w-80 h-screen bg-[#1e1e1e] border-r border-[#333] flex flex-col overflow-hidden hidden md:flex">
      <Logo />
      
      <div className="flex-1 overflow-y-auto px-2 py-4 no-scrollbar">
        <div className="px-2 pb-2">
          <div className="flex items-center text-sm font-semibold tracking-wide text-gray-400 cursor-pointer hover:text-white transition-colors">
            <ChevronDown className="w-4 h-4 mr-1" />
            Development
          </div>
        </div>
        
        <div className="flex flex-col mt-2">
          {toolsList.map((tool) => {
            const isActive = activeToolId === tool.id;
            
            // Clone the icon to inject dynamic color if active
            const toolIcon = React.cloneElement(tool.icon, {
              className: `w-5 h-5 ${isActive ? 'text-green-500' : 'text-gray-400'}`,
            });
            
            return (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`flex items-center px-4 py-3 rounded-md text-left transition-colors font-medium text-[15px] mb-1 ${
                  isActive
                    ? "bg-[#2a3028] text-green-500"
                    : "hover:bg-[#2a2d2e] text-gray-300 hover:text-gray-100"
                }`}
              >
                <span className="mr-4">{toolIcon}</span>
                <span className="truncate">{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
