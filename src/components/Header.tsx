import { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 glass h-20 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-glow">
          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-wide text-white">
            水利信息基础设施智能运维平台
          </h1>
          <p className="text-xs text-[#8B8898]">Intelligent Operation & Maintenance Platform</p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
          <span className="text-xs text-[#8B8898]">System Status</span>
          <span className="text-emerald-400 font-medium text-sm">Operational</span>
        </div>
        <div className="h-8 w-px bg-white/10"></div>
        <div className="flex flex-col items-end text-white tracking-wider font-mono">
          <span className="text-xs text-[#8B8898]">{formatDate(time)}</span>
          <span className="text-lg">{formatTime(time)}</span>
        </div>
      </div>
    </header>
  );
}
