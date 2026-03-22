import { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';

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
    return `${year}/${month}/${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <header className="relative flex justify-between items-center h-20 shrink-0 w-full gap-4 tech-panel px-6">
      <div className="tech-panel-accent-tr"></div>
      <div className="tech-panel-accent-bl"></div>

      {/* Left Title */}
      <div className="flex items-center flex-1 min-w-0">
        <h1 className="text-[24px] font-bold tracking-widest text-white drop-shadow-[0_0_10px_rgba(0,242,254,0.6)] truncate">
          水利信息基础设施智能运维平台
        </h1>
      </div>

      {/* Middle Stats */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="flex flex-col items-center">
          <span className="tech-label">网络设备</span>
          <span className="tech-value text-2xl">127</span>
        </div>
        
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#00f2fe]/50 to-transparent"></div>
        
        <div className="flex flex-col items-center">
          <span className="tech-label">信创服务器</span>
          <span className="tech-value text-2xl">2367</span>
        </div>
        
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#00f2fe]/50 to-transparent"></div>
        
        <div className="flex flex-col items-center">
          <span className="tech-label">网络安全设备</span>
          <span className="tech-value text-2xl">2768</span>
        </div>
      </div>

      {/* Right Weather & Time */}
      <div className="flex items-center justify-end flex-1 min-w-0 gap-6">
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-[#00f2fe]" />
          <span className="text-sm text-[#ebf8ff] font-medium tracking-wide whitespace-nowrap">多云 23-27°C</span>
        </div>
        
        <div className="w-[1px] h-4 bg-[#00f2fe]/30"></div>
        
        <div className="flex items-center gap-3 text-[#ebf8ff] font-mono tracking-wider whitespace-nowrap">
          <span>{formatDate(time)}</span>
          <span className="text-[#00f2fe] font-bold">{formatTime(time)}</span>
        </div>
      </div>
    </header>
  );
}
