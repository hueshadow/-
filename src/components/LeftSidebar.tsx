import { Cpu, Server, Shield } from 'lucide-react';

export default function LeftSidebar() {
  return (
    <aside className="w-80 flex flex-col gap-4 shrink-0">
      {/* Inventory Stats */}
      <section className="glass p-5">
        <h2 className="text-sm font-medium text-white mb-5 flex items-center gap-2">
          基础资源统计
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/5 text-white rounded-lg">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#8B8898] mb-0.5">网络设备</p>
                <p className="text-lg font-semibold text-white">4,306</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/5 text-white rounded-lg">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#8B8898] mb-0.5">信创服务器</p>
                <p className="text-lg font-semibold text-white">2,356</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/5 text-white rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#8B8898] mb-0.5">网络安全设备</p>
                <p className="text-lg font-semibold text-white">2,767</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Rates */}
      <section className="glass p-5 flex-1">
        <h2 className="text-sm font-medium text-white mb-6 flex items-center gap-2">
          网络在线率
        </h2>
        <div className="grid grid-cols-1 gap-6 h-full content-start">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2"></path>
                <path className="text-white" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="2"></path>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-semibold">75%</span>
                <span className="text-xs text-[#8B8898] mt-1">整体</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around px-2">
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                  <path className="text-emerald-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="68, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">68%</span>
                  <span className="text-[10px] text-[#8B8898]">汇聚</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                  <path className="text-indigo-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="44, 100" strokeLinecap="round" strokeWidth="2.5"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm font-semibold">44%</span>
                  <span className="text-[10px] text-[#8B8898]">其他</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
