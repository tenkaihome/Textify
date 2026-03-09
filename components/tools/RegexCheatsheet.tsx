import React from "react";

export default function RegexCheatsheet() {
  const cheats = [
    { match: ".", desc: "Any character except newline" },
    { match: "\\w", desc: "Word character (a-z, A-Z, 0-9, _)" },
    { match: "\\d", desc: "Digit (0-9)" },
    { match: "\\s", desc: "Whitespace character" },
    { match: "[abc]", desc: "Any of a, b, or c" },
    { match: "[^abc]", desc: "Not a, b, or c" },
    { match: "^", desc: "Start of string" },
    { match: "$", desc: "End of string" },
    { match: "*", desc: "0 or more" },
    { match: "+", desc: "1 or more" },
    { match: "?", desc: "0 or 1" },
    { match: "{n,m}", desc: "Between n and m times" }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Regex Cheatsheet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cheats.map((c, i) => (
          <div key={i} className="bg-[#111] border border-[#333] p-4 rounded-xl flex flex-col justify-center items-center text-center">
            <div className="text-xl text-blue-400 font-mono font-bold mb-3 bg-[#222] px-4 py-2 rounded border border-[#444] min-w-[3rem]">{c.match}</div>
            <p className="text-gray-400 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
