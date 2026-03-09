import React, { useState } from "react";
import { Copy, RefreshCw, Type } from "lucide-react";

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState<number>(3);
  const [text, setText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generateLorem = () => {
    const loremArray = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa."
    ];

    let result = "";
    for (let i = 0; i < paragraphs; i++) {
      result += loremArray[i % loremArray.length] + "\n\n";
    }
    setText(result.trim());
    setCopied(false);
  };

  React.useEffect(() => {
    generateLorem();
  }, [paragraphs]);

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-100 p-6 rounded-xl border border-[#333]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#333]">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Type className="text-green-500 w-6 h-6" /> Lorem Ipsum Generator
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Paragraphs:</label>
            <input
              type="number"
              min="1"
              max="50"
              value={paragraphs}
              onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 bg-[#2d2d2d] border border-[#444] rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-green-500 transition-colors text-white"
            />
          </div>
          <button
            onClick={generateLorem}
            className="flex items-center gap-1.5 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-200 px-3 py-1.5 rounded-md transition-colors text-sm font-medium border border-[#444]"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium shadow-md shadow-green-900/20"
          >
            <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-[#121212] rounded-lg border border-[#222] p-6 overflow-y-auto">
        <textarea
          value={text}
          readOnly
          className="w-full h-full bg-transparent resize-none outline-none text-gray-300 leading-relaxed font-sans"
        />
      </div>
    </div>
  );
}
