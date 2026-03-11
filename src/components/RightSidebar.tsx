import { MoreHorizontal } from 'lucide-react';

export default function RightSidebar() {
  return (
    <aside className="w-96 flex flex-col gap-4 shrink-0 overflow-y-auto scroll-hide">
      {/* Real Time Alerts */}
      <section className="glass p-5">
        <h2 className="text-sm font-medium text-white mb-5 flex items-center justify-between">
          <span>实时告警</span>
          <button className="text-[#8B8898] hover:text-white transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </h2>
        <div className="text-xs w-full">
          <div className="grid grid-cols-4 border-b border-white/5 pb-3 mb-3 text-[#8B8898]">
            <div>发现时间</div>
            <div className="col-span-2">告警信息</div>
            <div className="text-right">状态</div>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-4 items-center">
              <div className="text-[#8B8898]">20:00</div>
              <div className="col-span-2 truncate text-white/90">徐州汇聚-邳州站断开</div>
              <div className="text-right"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-[10px] border border-red-500/20">断线</span></div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <div className="text-[#8B8898]">20:01</div>
              <div className="col-span-2 truncate text-white/90">核心核心交换机链路抖动</div>
              <div className="text-right"><span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded text-[10px] border border-red-500/20">断线</span></div>
            </div>
            <div className="grid grid-cols-4 items-center">
              <div className="text-[#8B8898]">20:01</div>
              <div className="col-span-2 truncate text-white/90">淮安四站数据异常</div>
              <div className="text-right"><span className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded text-[10px] border border-orange-500/20">异常</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Traffic Analysis */}
      <section className="glass p-5">
        <h2 className="text-sm font-medium text-white mb-4 flex items-center justify-between">
          <span>交换机流量分析</span>
          <span className="text-[10px] text-[#8B8898] bg-white/5 px-2 py-1 rounded">单位: Mbps</span>
        </h2>
        <div className="h-32 flex flex-col justify-end mt-2">
          <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)"></line>
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)"></line>
            <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)"></line>
            <path d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2"></path>
            <path d="M0 70 Q 50 50, 100 30 T 200 60 T 300 40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"></path>
          </svg>
          <div className="flex justify-between text-[10px] text-[#8B8898] mt-2 font-mono">
            <span>19:30</span><span>19:32</span><span>19:34</span><span>19:36</span>
          </div>
        </div>
      </section>

      {/* Server Monitoring */}
      <section className="glass p-5 flex-1">
        <h2 className="text-sm font-medium text-white mb-5 flex items-center gap-2">
          服务器监控
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between items-center">
            <div className="text-sm text-white font-medium">信创服务器1</div>
            <div className="text-sm font-mono text-[#8B8898]">10.33.5.10</div>
          </div>
          <div className="p-3 border border-white/5 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#8B8898]">CPU使用率</span>
              <span className="text-xs font-medium text-white">80%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white/80 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="p-3 border border-white/5 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#8B8898]">内存使用率</span>
              <span className="text-xs font-medium text-white">65%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-400 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="p-3 border border-white/5 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#8B8898]">磁盘使用率</span>
              <span className="text-xs font-medium text-white">80%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white/80 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="p-3 border border-white/5 bg-white/5 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-[#8B8898]">网卡流量</span>
              <span className="text-xs font-medium text-white">42%</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
