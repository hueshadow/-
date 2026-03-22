import React from 'react';
import { Activity } from 'lucide-react';

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y, 
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ");
};

const Gauge = ({ title, value }: { title: string, value: number }) => {
  const startAngle = 225;
  const endAngle = 495;
  const currentAngle = startAngle + (value / 100) * 270;
  
  return (
    <div className="relative flex flex-col items-center justify-center w-40 h-40">
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${title}`} gradientUnits="userSpaceOnUse" x1="20" y1="180" x2="180" y2="20">
            <stop offset="0%" stopColor="#0055ff" />
            <stop offset="100%" stopColor="#00ffff" />
          </linearGradient>
          <filter id={`glow-${title}`} filterUnits="userSpaceOnUse" x="-50" y="-50" width="300" height="300">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id={`glow-strong-${title}`} filterUnits="userSpaceOnUse" x="-50" y="-50" width="300" height="300">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle cx="100" cy="100" r="85" fill="rgba(0, 20, 50, 0.3)" />
        
        {/* Outer dashed ring */}
        <path 
          d={describeArc(100, 100, 85, startAngle, endAngle)} 
          fill="none" 
          stroke="#00f2fe" 
          strokeWidth="1" 
          strokeDasharray="4 4" 
          opacity="0.5"
        />
        
        {/* Inner solid ring */}
        <path 
          d={describeArc(100, 100, 75, startAngle, endAngle)} 
          fill="none" 
          stroke="#0055ff" 
          strokeWidth="1" 
          opacity="0.8"
        />
        
        {/* Thick background arc */}
        <path 
          d={describeArc(100, 100, 55, startAngle, endAngle)} 
          fill="none" 
          stroke="#0a1930" 
          strokeWidth="24" 
        />
        
        {/* Thick foreground arc */}
        <path 
          d={describeArc(100, 100, 55, startAngle, currentAngle)} 
          fill="none" 
          stroke={`url(#grad-${title})`} 
          strokeWidth="24" 
          strokeLinecap="butt"
          filter={`url(#glow-${title})`}
        />
        
        {/* Center circle */}
        <circle cx="100" cy="100" r="12" fill="#0a1930" stroke="#0055ff" strokeWidth="2" />
        
        {/* Needle */}
        <g filter={`url(#glow-strong-${title})`}>
          <line 
            x1={polarToCartesian(100, 100, 12, currentAngle).x} 
            y1={polarToCartesian(100, 100, 12, currentAngle).y} 
            x2={polarToCartesian(100, 100, 80, currentAngle).x} 
            y2={polarToCartesian(100, 100, 80, currentAngle).y} 
            stroke="#ffffff" 
            strokeWidth="2"
          />
          {/* Needle tip glow */}
          <circle 
            cx={polarToCartesian(100, 100, 80, currentAngle).x} 
            cy={polarToCartesian(100, 100, 80, currentAngle).y} 
            r="2" 
            fill="#ffffff" 
          />
        </g>
      </svg>
      
      {/* Text */}
      <div className="absolute bottom-2 flex flex-col items-center">
        <span className="text-white text-sm font-medium mb-1 drop-shadow-md">{title}</span>
        <span className="text-[#00ff9d] text-2xl font-bold font-mono leading-none drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]">{value}%</span>
      </div>
    </div>
  );
};

export default function LeftSidebar() {
  return (
    <aside className="tech-panel flex items-stretch h-48 z-50 mt-4 ml-4">
      {/* Vertical Title Bar */}
      <div className="relative flex items-center justify-center w-12 bg-[#00f2fe]/5 border-r border-[#00f2fe]/20 shrink-0">
        {/* Left bracket decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-2 border-l-2 border-y-2 border-[#00f2fe]/50 rounded-l-[4px]">
          <div className="absolute left-0 top-1/4 w-1 h-[1px] bg-[#00f2fe]/50"></div>
          <div className="absolute left-0 top-2/4 w-1 h-[1px] bg-[#00f2fe]/50"></div>
          <div className="absolute left-0 top-3/4 w-1 h-[1px] bg-[#00f2fe]/50"></div>
        </div>
        
        <div className="text-white font-bold text-lg tracking-[0.3em] drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]" style={{ writingMode: 'vertical-rl' }}>
          网络在线率
        </div>
      </div>
      
      {/* Gauges Container */}
      <div className="relative flex items-center gap-6 px-8 py-4 overflow-hidden">
        {/* Gauges */}
        <Gauge title="整体" value={35} />
        <Gauge title="汇聚" value={48} />
        <Gauge title="其他" value={85} />
      </div>
    </aside>
  );
}
