export default function Footer() {
  return (
    <footer className="h-10 glass flex items-center px-6 text-xs text-[#8B8898] justify-between shrink-0">
      <div className="flex gap-6">
        <span>节点总数: <strong className="text-white font-medium">154</strong></span>
        <span>当前活动连接: <strong className="text-white font-medium">1,284</strong></span>
        <span className="text-white">加密通道: TLS 1.3 Active</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-400"></span>
        <span className="tracking-wider text-[10px] uppercase">Real-time secure stream active</span>
      </div>
    </footer>
  );
}
