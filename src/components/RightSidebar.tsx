import { MoreHorizontal, Activity, Server, ShieldAlert } from 'lucide-react';

export default function RightSidebar() {
  return (
    <aside className="w-96 flex flex-col gap-4 shrink-0 overflow-y-auto scroll-hide">
      {/* Real Time Alerts */}
      <section className="tech-panel p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="tech-panel-title">
            <ShieldAlert className="w-4 h-4 text-[#00f2fe]" />
            <span>实时告警</span>
          </h2>
          <button className="text-[#8B8898] hover:text-[#00f2fe] transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        <div className="text-xs w-full">
          <div className="grid grid-cols-4 border-b border-[#00f2fe]/20 pb-3 mb-3 text-[#8B8898] font-medium">
            <div>发现时间</div>
            <div className="col-span-2">告警信息</div>
            <div className="text-right">状态</div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 items-center bg-red-500/5 p-2 rounded border border-red-500/10">
              <div className="text-[#8B8898] font-mono">20:00</div>
              <div className="col-span-2 truncate text-white/90">徐州汇聚-邳州站断开</div>
              <div className="text-right"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] border border-red-500/30">断线</span></div>
            </div>
            <div className="grid grid-cols-4 items-center bg-red-500/5 p-2 rounded border border-red-500/10">
              <div className="text-[#8B8898] font-mono">20:01</div>
              <div className="col-span-2 truncate text-white/90">核心核心交换机链路抖动</div>
              <div className="text-right"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] border border-red-500/30">断线</span></div>
            </div>
            <div className="grid grid-cols-4 items-center bg-orange-500/5 p-2 rounded border border-orange-500/10">
              <div className="text-[#8B8898] font-mono">20:01</div>
              <div className="col-span-2 truncate text-white/90">淮安四站数据异常</div>
              <div className="text-right"><span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-[10px] border border-orange-500/30">异常</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Traffic Analysis */}
      <section className="tech-panel p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="tech-panel-title">
            <Activity className="w-4 h-4 text-[#00f2fe]" />
            <span>交换机流量分析</span>
          </h2>
          <span className="text-[10px] text-[#00f2fe] bg-[#00f2fe]/10 border border-[#00f2fe]/20 px-2 py-1 rounded">单位: Mbps</span>
        </div>
        <div className="h-32 flex flex-col justify-end mt-2 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-[#00f2fe] border-dashed w-full h-0"></div>
            <div className="border-b border-[#00f2fe] border-dashed w-full h-0"></div>
            <div className="border-b border-[#00f2fe] border-dashed w-full h-0"></div>
            <div className="border-b border-[#00f2fe] border-dashed w-full h-0"></div>
          </div>
          <svg className="w-full h-full relative z-10" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#00f2fe" stopOpacity="1" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 L 300 100 L 0 100 Z" fill="url(#areaGrad)"></path>
            <path d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70" fill="none" stroke="url(#lineGrad)" strokeWidth="2" filter="drop-shadow(0 0 4px #00f2fe)"></path>
            <path d="M0 70 Q 50 50, 100 30 T 200 60 T 300 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4"></path>
          </svg>
          <div className="flex justify-between text-[10px] text-[#8B8898] mt-2 font-mono relative z-10">
            <span>19:30</span><span>19:32</span><span>19:34</span><span>19:36</span>
          </div>
        </div>
      </section>

      {/* Server Monitoring */}
      <section className="tech-panel p-5 flex-1">
        <h2 className="tech-panel-title mb-5">
          <Server className="w-4 h-4 text-[#00f2fe]" />
          <span>服务器监控</span>
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 p-3 bg-[#00f2fe]/5 border border-[#00f2fe]/20 rounded flex justify-between items-center">
            <div className="text-sm text-[#ebf8ff] font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></div>
              信创服务器1
            </div>
            <div className="text-sm font-mono text-[#00f2fe]">10.33.5.10</div>
          </div>
          
          <div className="p-3 border border-white/10 bg-black/20 rounded relative overflow-hidden group hover:border-[#00f2fe]/40 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-400/50"></div>
            <div className="flex justify-between items-center mb-2 pl-2">
              <span className="text-xs text-[#8B8898]">CPU使用率</span>
              <span className="text-xs font-medium text-white font-mono">80%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden ml-2 w-[calc(100%-8px)]">
              <div className="bg-gradient-to-r from-blue-500 to-blue-300 h-full rounded-full shadow-[0_0_8px_#3b82f6]" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="p-3 border border-white/10 bg-black/20 rounded relative overflow-hidden group hover:border-[#00f2fe]/40 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400/50"></div>
            <div className="flex justify-between items-center mb-2 pl-2">
              <span className="text-xs text-[#8B8898]">内存使用率</span>
              <span className="text-xs font-medium text-white font-mono">65%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden ml-2 w-[calc(100%-8px)]">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 h-full rounded-full shadow-[0_0_8px_#6366f1]" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="p-3 border border-white/10 bg-black/20 rounded relative overflow-hidden group hover:border-[#00f2fe]/40 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-400/50"></div>
            <div className="flex justify-between items-center mb-2 pl-2">
              <span className="text-xs text-[#8B8898]">磁盘使用率</span>
              <span className="text-xs font-medium text-white font-mono">80%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden ml-2 w-[calc(100%-8px)]">
              <div className="bg-gradient-to-r from-purple-500 to-purple-300 h-full rounded-full shadow-[0_0_8px_#a855f7]" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="p-3 border border-white/10 bg-black/20 rounded relative overflow-hidden group hover:border-[#00f2fe]/40 transition-colors">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-400/50"></div>
            <div className="flex justify-between items-center mb-2 pl-2">
              <span className="text-xs text-[#8B8898]">网卡流量</span>
              <span className="text-xs font-medium text-white font-mono">42%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden ml-2 w-[calc(100%-8px)]">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-300 h-full rounded-full shadow-[0_0_8px_#10b981]" style={{ width: '42%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
