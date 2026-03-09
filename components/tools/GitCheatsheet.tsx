import React from "react";

export default function GitCheatsheet() {
  const commands = [
    { title: "Init", cmd: "git init", desc: "Initialize a local Git repository" },
    { title: "Clone", cmd: "git clone [url]", desc: "Clone a repository into a new directory" },
    { title: "Status", cmd: "git status", desc: "Check the working tree status" },
    { title: "Add", cmd: "git add .", desc: "Add file contents to the index" },
    { title: "Commit", cmd: "git commit -m '[msg]'", desc: "Record changes to the repository" },
    { title: "Push", cmd: "git push origin main", desc: "Update remote refs along with associated objects" },
    { title: "Pull", cmd: "git pull", desc: "Fetch from and integrate with another repository" },
    { title: "Branch", cmd: "git branch -b [branch]", desc: "Create a new branch and checkout" }
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Git Cheatsheet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commands.map((c, i) => (
          <div key={i} className="bg-[#111] border border-[#333] p-4 rounded-xl">
            <h3 className="font-bold text-gray-300 mb-2">{c.title}</h3>
            <div className="bg-[#222] p-3 rounded text-green-400 font-mono text-sm mb-2 font-bold">{c.cmd}</div>
            <p className="text-gray-500 text-sm">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
