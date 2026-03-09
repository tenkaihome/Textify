"use client";
import React, { useState, useEffect } from "react";
import cronstrue from "cronstrue";

const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
      checked ? 'bg-green-500' : 'bg-gray-600'
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);

export default function CrontabGenerator() {
  const [parts, setParts] = useState(["40", "*", "*", "*", "*"]);
  const [verbose, setVerbose] = useState(false);
  const [use24Hour, setUse24Hour] = useState(true);
  const [daysStartAtZero, setDaysStartAtZero] = useState(true);
  const [description, setDescription] = useState("");

  const cron = parts.join(" ").trim();

  useEffect(() => {
    try {
      if (!cron) {
        setDescription("Empty expression");
        return;
      }
      const desc = cronstrue.toString(cron, {
        verbose,
        use24HourTimeFormat: use24Hour,
        dayOfWeekStartIndexZero: daysStartAtZero,
        throwExceptionOnParseError: true
      });
      setDescription(desc);
    } catch (e: any) {
      setDescription(e.message || "Invalid cron expression");
    }
  }, [cron, verbose, use24Hour, daysStartAtZero]);

  const symbols = [
    { symbol: '*', meaning: 'Any value', example: '* * * * *', equivalent: 'Every minute' },
    { symbol: '-', meaning: 'Range of values', example: '1-10 * * * *', equivalent: 'Minutes 1 through 10' },
    { symbol: ',', meaning: 'List of values', example: '1,10 * * * *', equivalent: 'At minutes 1 and 10' },
    { symbol: '/', meaning: 'Step values', example: '*/10 * * * *', equivalent: 'Every 10 minutes' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#111] py-2 lg:py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-gray-200 mb-2">Crontab generator <span className="text-gray-600 text-[18px] ml-2 select-none">♥</span></h1>
        <p className="text-gray-400 text-sm">
          Validate and generate crontab and get the human-readable description of the cron schedule.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-[0.8] bg-[#1a1a1a] border border-[#262626] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="flex bg-[#222] rounded-lg py-1 px-4 w-full max-w-[320px] mb-6 shadow-inner justify-between gap-1 focus-within:ring-1 focus-within:ring-gray-500 transition-all border border-[#333]">
            {parts.map((p, idx) => (
              <input
                key={idx}
                type="text"
                className="w-full min-w-[30px] text-center text-3xl font-mono text-gray-200 bg-transparent focus:outline-none focus:bg-[#333] rounded py-3 cursor-text transition-colors"
                value={p}
                onFocus={(e) => e.target.select()}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    const newParts = [...parts];
                    newParts[idx] = "*";
                    setParts(newParts);
                  }
                }}
                onChange={(e) => {
                  const newParts = [...parts];
                  newParts[idx] = e.target.value;
                  setParts(newParts);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData.getData("text");
                  const split = text.trim().split(/\s+/);
                  if (split.length > 0) {
                     const newParts = [...parts];
                     for (let i = 0; i < split.length && i < newParts.length; i++) {
                       newParts[i] = split[i];
                     }
                     setParts(newParts);
                  }
                }}
              />
            ))}
          </div>
          
          <div className="text-[22px] text-gray-300 mb-8 min-h-[60px] text-center flex items-center justify-center -mt-2 tracking-wide font-light w-full">
            {description}
          </div>

          <div className="w-full max-w-[400px] h-px bg-[#333] mb-8"></div>

          <div className="flex flex-col gap-4 w-full max-w-[280px] pr-2">
            <div className="flex justify-between items-center group cursor-pointer" onClick={() => setVerbose(!verbose)}>
              <span className="text-[13px] font-medium text-gray-100 uppercase tracking-wider group-hover:text-white transition-colors">Verbose</span>
              <Switch checked={verbose} onChange={() => setVerbose(!verbose)} />
            </div>
            
            <div className="flex justify-between items-center group cursor-pointer" onClick={() => setUse24Hour(!use24Hour)}>
              <span className="text-[13px] font-medium text-gray-100 uppercase tracking-wider group-hover:text-white transition-colors">Use 24 hour time format</span>
              <Switch checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
            </div>
            
            <div className="flex justify-between items-center group cursor-pointer" onClick={() => setDaysStartAtZero(!daysStartAtZero)}>
              <span className="text-[13px] font-medium text-gray-100 uppercase tracking-wider group-hover:text-white transition-colors">Days start at 0</span>
              <Switch checked={daysStartAtZero} onChange={() => setDaysStartAtZero(!daysStartAtZero)} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-[650px]">
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-6 overflow-x-auto min-h-[170px] flex items-center text-gray-200">
            <pre className="text-[12px] leading-snug font-mono text-gray-300 whitespace-pre">
{`┌────────────── [optional] seconds (0 - 59)
│ ┌──────────── minute (0 - 59)
│ │ ┌────────── hour (0 - 23)
│ │ │ ┌──────── day of month (1 - 31)
│ │ │ │ ┌────── month (1 - 12) OR jan,feb,mar,apr ...
│ │ │ │ │ ┌──── day of week (0 - 6, sunday=0) OR sun,mon ...
│ │ │ │ │ │
* * * * * * command`}
            </pre>
          </div>

          <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-[13px] text-gray-400">
              <thead className="text-[11px] text-gray-400 bg-[#262626] uppercase shadow-sm">
                <tr>
                  <th className="px-5 py-4 font-bold tracking-wider">Symbol</th>
                  <th className="px-5 py-4 font-bold tracking-wider">Meaning</th>
                  <th className="px-5 py-4 font-bold tracking-wider">Example</th>
                  <th className="px-5 py-4 font-bold tracking-wider">Equivalent</th>
                </tr>
              </thead>
              <tbody className="bg-[#1a1a1a] divide-y divide-[#262626]">
                {symbols.map((row, i) => (
                  <tr key={i} className="hover:bg-[#222] transition-colors">
                    <td className="px-5 py-5 font-mono text-gray-300">{row.symbol}</td>
                    <td className="px-5 py-5">{row.meaning}</td>
                    <td className="px-5 py-5 font-mono text-gray-300 tracking-widest">{row.example}</td>
                    <td className="px-5 py-5">{row.equivalent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
