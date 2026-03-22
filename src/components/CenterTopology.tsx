import React, { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

// Helper to draw an isometric cube
const drawIsoBox = (cx: number, cy: number, w: number, d: number, h: number, colors: {top: string, left: string, right: string}, stroke?: string, opacity: number = 1) => {
  const strokeAttr = stroke ? `stroke="${stroke}" stroke-width="0.5"` : '';
  return `
    <g opacity="${opacity}">
      <!-- Left Face -->
      <path d="M ${cx} ${cy} L ${cx - w} ${cy - w*0.5} L ${cx - w} ${cy - w*0.5 - h} L ${cx} ${cy - h} Z" fill="${colors.left}" ${strokeAttr} />
      <!-- Right Face -->
      <path d="M ${cx} ${cy} L ${cx + d} ${cy - d*0.5} L ${cx + d} ${cy - d*0.5 - h} L ${cx} ${cy - h} Z" fill="${colors.right}" ${strokeAttr} />
      <!-- Top Face -->
      <path d="M ${cx} ${cy - h} L ${cx - w} ${cy - w*0.5 - h} L ${cx - w + d} ${cy - (w+d)*0.5 - h} L ${cx + d} ${cy - d*0.5 - h} Z" fill="${colors.top}" ${strokeAttr} />
    </g>
  `;
};

const createLargeNodeSVG = () => {
  const cx = 100;
  const cy = 160;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">`;
  
  // Shadow
  svg += `<path d="M 100 180 L 30 145 L 100 110 L 170 145 Z" fill="#000000" opacity="0.3" filter="blur(8px)" />`;
  
  // Base Glow
  svg += `<path d="M 100 165 L 40 135 L 100 105 L 160 135 Z" fill="none" stroke="#00ff00" stroke-width="6" filter="blur(4px)" opacity="0.8" />`;
  svg += `<path d="M 100 165 L 40 135 L 100 105 L 160 135 Z" fill="none" stroke="#00ff00" stroke-width="2" />`;
  
  // Base Top
  svg += `<path d="M 100 155 L 40 125 L 100 95 L 160 125 Z" fill="rgba(100, 255, 150, 0.4)" stroke="#8affb1" stroke-width="1" />`;
  // Base Sides
  svg += `<path d="M 40 125 L 40 135 L 100 165 L 100 155 Z" fill="rgba(50, 200, 100, 0.6)" />`;
  svg += `<path d="M 100 155 L 100 165 L 160 135 L 160 125 Z" fill="rgba(20, 150, 80, 0.6)" />`;

  // Rack drawing function
  const drawRack = (rcx: number, rcy: number) => {
    let rSvg = '';
    // Back glass
    rSvg += drawIsoBox(rcx, rcy, 25, 45, 90, {top: 'transparent', left: 'rgba(200,220,255,0.1)', right: 'rgba(200,220,255,0.05)'}, '#94a3b8', 1);
    
    // Servers
    for (let i = 0; i < 4; i++) {
      const scy = rcy - 10 - i * 20;
      // Server Box
      rSvg += drawIsoBox(rcx, scy, 23, 43, 12, {top: '#38bdf8', left: '#0284c7', right: '#0369a1'});
      // Details
      rSvg += `<path d="M ${rcx + 5} ${scy - 2.5} L ${rcx + 15} ${scy - 7.5} L ${rcx + 15} ${scy - 7.5 - 6} L ${rcx + 5} ${scy - 2.5 - 6} Z" fill="#0ea5e9" />`;
      rSvg += `<circle cx="${rcx + 25}" cy="${scy - 7.5}" r="1.5" fill="#4ade80" />`;
      rSvg += `<circle cx="${rcx + 30}" cy="${scy - 10}" r="1.5" fill="#4ade80" />`;
      rSvg += `<circle cx="${rcx + 35}" cy="${scy - 12.5}" r="1.5" fill="#4ade80" />`;
    }
    
    // Front Glass
    rSvg += `<path d="M ${rcx} ${rcy} L ${rcx - 25} ${rcy - 12.5} L ${rcx - 25} ${rcy - 12.5 - 90} L ${rcx} ${rcy - 90} Z" fill="rgba(200,220,255,0.15)" stroke="#94a3b8" stroke-width="0.5" />`;
    rSvg += `<path d="M ${rcx} ${rcy} L ${rcx + 45} ${rcy - 22.5} L ${rcx + 45} ${rcy - 22.5 - 90} L ${rcx} ${rcy - 90} Z" fill="rgba(200,220,255,0.05)" stroke="#94a3b8" stroke-width="0.5" />`;
    rSvg += `<path d="M ${rcx} ${rcy - 90} L ${rcx - 25} ${rcy - 12.5 - 90} L ${rcx - 25 + 45} ${rcy - 35 - 90} L ${rcx + 45} ${rcy - 22.5 - 90} Z" fill="rgba(200,220,255,0.2)" stroke="#94a3b8" stroke-width="0.5" />`;
    
    // Edges
    rSvg += `<path d="M ${rcx} ${rcy} L ${rcx} ${rcy - 90}" stroke="#94a3b8" stroke-width="1" />`;
    rSvg += `<path d="M ${rcx - 25} ${rcy - 12.5} L ${rcx - 25} ${rcy - 12.5 - 90}" stroke="#94a3b8" stroke-width="1" />`;
    rSvg += `<path d="M ${rcx + 45} ${rcy - 22.5} L ${rcx + 45} ${rcy - 22.5 - 90}" stroke="#94a3b8" stroke-width="1" />`;
    
    return rSvg;
  };

  // Left Rack
  svg += drawRack(cx - 15, cy - 15);
  // Right Rack
  svg += drawRack(cx + 15, cy + 5);
  
  svg += `</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

const createMediumNodeSVG = () => {
  const cx = 100;
  const cy = 160;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">`;
  
  // Shadow
  svg += `<path d="M 100 180 L 50 155 L 100 130 L 150 155 Z" fill="#000000" opacity="0.3" filter="blur(8px)" />`;
  
  // Base Glow
  svg += `<path d="M 100 165 L 60 145 L 100 125 L 140 145 Z" fill="none" stroke="#00ff00" stroke-width="6" filter="blur(4px)" opacity="0.8" />`;
  svg += `<path d="M 100 165 L 60 145 L 100 125 L 140 145 Z" fill="none" stroke="#00ff00" stroke-width="2" />`;
  
  // Base Top
  svg += `<path d="M 100 155 L 60 135 L 100 115 L 140 135 Z" fill="rgba(100, 255, 150, 0.4)" stroke="#8affb1" stroke-width="1" />`;
  // Base Sides
  svg += `<path d="M 60 135 L 60 145 L 100 165 L 100 155 Z" fill="rgba(50, 200, 100, 0.6)" />`;
  svg += `<path d="M 100 155 L 100 165 L 140 145 L 140 135 Z" fill="rgba(20, 150, 80, 0.6)" />`;

  // Body (Dark Grey)
  svg += drawIsoBox(cx, cy - 10, 35, 35, 50, {top: '#475569', left: '#334155', right: '#1e293b'});
  
  // Vertical Blue Glass Panels on Right Face
  for (let i = 0; i < 3; i++) {
    const px = cx + 5 + i * 10;
    const py = cy - 10 - 2.5 - i * 5;
    svg += `<path d="M ${px} ${py} L ${px + 5} ${py - 2.5} L ${px + 5} ${py - 2.5 - 40} L ${px} ${py - 40} Z" fill="#0ea5e9" opacity="0.8" />`;
    svg += `<path d="M ${px} ${py} L ${px + 5} ${py - 2.5} L ${px + 5} ${py - 2.5 - 40} L ${px} ${py - 40} Z" fill="none" stroke="#38bdf8" stroke-width="0.5" />`;
  }
  
  // Top Section (Blue)
  const topCy = cy - 10 - 50;
  svg += drawIsoBox(cx, topCy, 35, 35, 20, {top: '#38bdf8', left: '#0284c7', right: '#0369a1'});
  
  // Details on Blue Top (Right Face)
  svg += `<path d="M ${cx + 5} ${topCy - 5} L ${cx + 30} ${topCy - 17.5}" stroke="#7dd3fc" stroke-width="1.5" stroke-dasharray="2 4" />`;
  svg += `<path d="M ${cx + 5} ${topCy - 10} L ${cx + 30} ${topCy - 22.5}" stroke="#7dd3fc" stroke-width="1.5" stroke-dasharray="2 4" />`;
  
  svg += `</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

const createSmallNodeSVG = () => {
  const cx = 100;
  const cy = 160;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">`;
  
  // Shadow
  svg += `<path d="M 100 180 L 50 155 L 100 130 L 150 155 Z" fill="#000000" opacity="0.3" filter="blur(8px)" />`;
  
  // Base Glow
  svg += `<path d="M 100 165 L 60 145 L 100 125 L 140 145 Z" fill="none" stroke="#00ff00" stroke-width="6" filter="blur(4px)" opacity="0.8" />`;
  svg += `<path d="M 100 165 L 60 145 L 100 125 L 140 145 Z" fill="none" stroke="#00ff00" stroke-width="2" />`;
  
  // Base Top
  svg += `<path d="M 100 155 L 60 135 L 100 115 L 140 135 Z" fill="rgba(100, 255, 150, 0.4)" stroke="#8affb1" stroke-width="1" />`;
  // Base Sides
  svg += `<path d="M 60 135 L 60 145 L 100 165 L 100 155 Z" fill="rgba(50, 200, 100, 0.6)" />`;
  svg += `<path d="M 100 155 L 100 165 L 140 145 L 140 135 Z" fill="rgba(20, 150, 80, 0.6)" />`;

  // Body Frame (Dark Grey)
  svg += drawIsoBox(cx, cy - 10, 30, 30, 70, {top: '#475569', left: '#334155', right: '#1e293b'});
  
  // Left Face Blue Panel (Inset)
  svg += `<path d="M ${cx - 2} ${cy - 10 - 5} L ${cx - 28} ${cy - 10 - 18} L ${cx - 28} ${cy - 10 - 18 - 60} L ${cx - 2} ${cy - 10 - 5 - 60} Z" fill="#0284c7" />`;
  // Lines on left panel
  svg += `<path d="M ${cx - 5} ${cy - 30} L ${cx - 25} ${cy - 40}" stroke="#38bdf8" stroke-width="1.5" />`;
  svg += `<path d="M ${cx - 5} ${cy - 40} L ${cx - 25} ${cy - 50}" stroke="#38bdf8" stroke-width="1.5" />`;
  svg += `<path d="M ${cx - 5} ${cy - 50} L ${cx - 25} ${cy - 60}" stroke="#38bdf8" stroke-width="1.5" />`;
  
  // Right Face Blue Panel (Inset)
  svg += `<path d="M ${cx + 2} ${cy - 10 - 5} L ${cx + 28} ${cy - 10 - 18} L ${cx + 28} ${cy - 10 - 18 - 60} L ${cx + 2} ${cy - 10 - 5 - 60} Z" fill="#0369a1" />`;
  
  // Dots on Right Panel
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const px = cx + 6 + j * 7;
      const py = cy - 25 - i * 9 - j * 3.5;
      const isGreen = Math.random() > 0.8;
      const isEmpty = Math.random() > 0.6;
      if (!isEmpty) {
        const color = isGreen ? '#4ade80' : '#7dd3fc';
        svg += `<path d="M ${px} ${py} L ${px + 3} ${py - 1.5} L ${px + 3} ${py - 4.5} L ${px} ${py - 3} Z" fill="${color}" />`;
      }
    }
  }
  
  // Top Grid Dots
  const topCy = cy - 10 - 70;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const px = cx - 15 + i * 10 + j * 10;
      const py = topCy - i * 5 + j * 5;
      svg += `<circle cx="${px}" cy="${py}" r="1" fill="#94a3b8" />`;
    }
  }
  
  svg += `</svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};

const largeNodeImg = createLargeNodeSVG();
const mediumNodeImg = createMediumNodeSVG();
const smallNodeImg = createSmallNodeSVG();

// --- Isometric Grid Configuration ---
const originX = 960;
const originY = 150;
const stepU_x = 110;
const stepU_y = 55;
const stepV_x = -110;
const stepV_y = 55;

const getXY = (u: number, v: number) => ({
  x: originX + u * stepU_x + v * stepV_x,
  y: originY + u * stepU_y + v * stepV_y
});

const nodesData = [
  { id: 'nanjing', name: '南京汇聚', u: 1, v: 1, type: 'large' },
  { id: 'jiangdu', name: '江都集控中心', u: 4, v: 1, type: 'large' },
  
  { id: 'suqian', name: '宿迁汇聚', u: 0, v: 3.5, type: 'medium' },
  { id: 'xuzhou', name: '徐州汇聚', u: 2.5, v: 3.5, type: 'medium' },
  { id: 'huaian', name: '淮安汇聚', u: 4.5, v: 3.5, type: 'medium' },
  { id: 'yangzhou', name: '扬州汇聚', u: 7, v: 3.5, type: 'medium' },
  
  { id: 'zaohe', name: '皂河站', u: -3, v: 5, type: 'small' },
  { id: 'sihong', name: '泗洪站', u: -1.5, v: 5, type: 'small' },
  { id: 'siyang', name: '泗阳站', u: -2, v: 6.5, type: 'small' },
  { id: 'suining2', name: '睢宁二站', u: -0.5, v: 5.5, type: 'small' },
  { id: 'liulaojian', name: '刘老涧站', u: -0.5, v: 7, type: 'small' },
  
  { id: 'pizhou', name: '邳州站', u: 0.5, v: 9.5, type: 'small' },
  { id: 'liushan', name: '刘山站', u: 2.5, v: 9.5, type: 'small' },
  { id: 'jietai', name: '解台站', u: 1.5, v: 8, type: 'small' },
  { id: 'linjiaba', name: '蔺家坝站', u: 3, v: 8, type: 'small' },
  
  { id: 'huaiyin3', name: '淮阴三站', u: 4, v: 5.5, type: 'small' },
  { id: 'huaian4', name: '淮安四站', u: 5, v: 6.5, type: 'small' },
  { id: 'hongze', name: '洪泽站', u: 5.5, v: 5.5, type: 'small' },
  
  { id: 'yangzhou_branch', name: '扬州分公司', u: 7.5, v: 6.5, type: 'small' },
  { id: 'jinhu', name: '金湖站', u: 8, v: 7.5, type: 'small' },
  { id: 'baoying', name: '宝应站', u: 8.5, v: 6.5, type: 'small' },
];

const pathsData = [
  // Main horizontal trunk
  { path: [[0, 3.5], [7, 3.5]], color: '#00ffff' },
  
  // Nanjing connection
  { path: [[1, 1], [1, 2], [1.5, 2], [1.5, 3.5]], color: '#00ffff' },
  
  // Jiangdu connection
  { path: [[4, 1], [4, 2], [5.5, 2], [5.5, 3.5]], color: '#00ffff' },
  
  // Suqian trunk & branches
  { path: [[0, 3.5], [0, 7]], color: '#00ffff' },
  { path: [[-3, 5], [0, 5]], color: '#00ffff' }, // Zaohe -> Sihong -> Trunk
  { path: [[-2, 6.5], [0, 6.5]], color: '#00ffff' }, // Siyang -> Trunk
  { path: [[-0.5, 5.5], [0, 5.5]], color: '#00ffff' }, // Suining 2 -> Trunk
  { path: [[-0.5, 7], [0, 7]], color: '#00ffff' }, // Liulaojian -> Trunk
  
  // Xuzhou trunk & branches
  { path: [[2.5, 3.5], [2.5, 9.5]], color: '#00ffff' },
  { path: [[0.5, 9.5], [2.5, 9.5]], color: '#00ffff' }, // Pizhou -> Liushan
  { path: [[1.5, 8], [3, 8]], color: '#00ffff' }, // Jietai -> Linjiaba
  
  // Huaian trunk & branches
  { path: [[4.5, 3.5], [4.5, 6.5]], color: '#00ffff' },
  { path: [[4, 5.5], [5.5, 5.5]], color: '#00ffff' }, // Huaiyin 3 -> Hongze
  { path: [[4.5, 6.5], [5, 6.5]], color: '#00ffff' }, // Trunk -> Huaian 4
  
  // Yangzhou trunk & branches
  { path: [[7, 3.5], [7, 7.5]], color: '#00ffff' },
  { path: [[7, 6.5], [8.5, 6.5]], color: '#00ffff' }, // Trunk -> Yangzhou Branch -> Baoying
  { path: [[7, 7.5], [8, 7.5]], color: '#00ffff' }, // Trunk -> Jinhu
];

export default function CenterTopology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  const [nodes, setNodes] = useState(() =>
    nodesData.map(n => ({ ...n, ...getXY(n.u, n.v) }))
  );

  const [paths, setPaths] = useState(() =>
    pathsData.map(p => ({
      ...p,
      path: p.path.map(pt => {
        const xy = getXY(pt[0], pt[1]);
        const matchingNode = nodesData.find(n => Math.abs(n.u - pt[0]) < 0.01 && Math.abs(n.v - pt[1]) < 0.01);
        return {
          x: xy.x,
          y: xy.y,
          nodeId: matchingNode ? matchingNode.id : null
        };
      })
    }))
  );

  const lastPointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current.parentElement || document.body;
        // Calculate scale to fit 1920x1080
        const scaleX = clientWidth / 1920;
        const scaleY = clientHeight / 1080;
        setScale(Math.min(scaleX, scaleY) * 0.95); // 95% to leave some margin
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBgPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsPanning(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleNodePointerDown = (e: React.PointerEvent, nodeId: string) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.stopPropagation();
    setDraggedNodeId(nodeId);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning && !draggedNodeId) return;

    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    if (isPanning) {
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (draggedNodeId) {
      const adjustedDx = dx / scale;
      const adjustedDy = dy / scale;

      setNodes(prev => prev.map(n =>
        n.id === draggedNodeId ? { ...n, x: n.x + adjustedDx, y: n.y + adjustedDy } : n
      ));

      setPaths(prev => prev.map(p => ({
        ...p,
        path: p.path.map(pt =>
          pt.nodeId === draggedNodeId ? { ...pt, x: pt.x + adjustedDx, y: pt.y + adjustedDy } : pt
        )
      })));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPanning) {
      setIsPanning(false);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (draggedNodeId) {
      const node = nodes.find(n => n.id === draggedNodeId);
      if (node) {
        // Calculate current u, v from x, y
        const dx = node.x - originX;
        const dy = node.y - originY;
        const A = dx / stepU_x;
        const B = dy / stepU_y;
        
        // Snap to nearest 0.5 grid increment
        const u = Math.round(((A + B) / 2) * 2) / 2;
        const v = Math.round(((B - A) / 2) * 2) / 2;
        
        const snappedXY = getXY(u, v);

        setNodes(prev => prev.map(n => 
          n.id === draggedNodeId ? { ...n, x: snappedXY.x, y: snappedXY.y, u, v } : n
        ));

        setPaths(prev => prev.map(p => ({
          ...p,
          path: p.path.map(pt => 
            pt.nodeId === draggedNodeId ? { ...pt, x: snappedXY.x, y: snappedXY.y } : pt
          )
        })));
      }

      setDraggedNodeId(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const getPathString = (path: {x: number, y: number}[]) => {
    return path.map((pt, index) => `${index === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');
  };

  return (
    <div 
      className={`absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-auto ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`} 
      ref={containerRef}
      onPointerDown={handleBgPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div 
        className="relative" 
        style={{ 
          width: 1920, 
          height: 1080, 
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Isometric Grid Background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern id="iso-grid" width="220" height="110" patternUnits="userSpaceOnUse" patternTransform="translate(960, 150)">
              <path d="M 110 0 L 220 55 L 110 110 L 0 55 Z" fill="none" stroke="#1a2b4c" strokeWidth="1" opacity="0.4"/>
              <path d="M 0 55 L 220 55 M 110 0 L 110 110" fill="none" stroke="#1a2b4c" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#iso-grid)" />

          {/* Connection Lines */}
          {paths.map((item, idx) => {
            const d = getPathString(item.path);
            let length = 0;
            for(let i=1; i<item.path.length; i++) {
               const p1 = item.path[i-1];
               const p2 = item.path[i];
               length += Math.hypot(p2.x - p1.x, p2.y - p1.y);
            }
            const dur = Math.max(3, length / 100);

            return (
              <g key={`path-${idx}`}>
                {/* Glow */}
                <path d={d} fill="none" stroke={item.color} strokeWidth="6" opacity="0.2" filter="blur(2px)" />
                {/* Core */}
                <path d={d} fill="none" stroke={item.color} strokeWidth="2" opacity="0.8" />
                
                {/* Animated Particles */}
                <circle r="4" fill="#fff" filter={`drop-shadow(0 0 6px ${item.color})`}>
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
                </circle>
                <circle r="2" fill="#fff">
                  <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} begin={`${dur/2}s`} />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          let nodeScale = 1;
          if (node.type === 'large') nodeScale = 1.2;
          else if (node.type === 'medium') nodeScale = 1.0;
          else nodeScale = 0.7;

          return (
            <div
              key={`node-${node.id}`}
              className={`absolute flex flex-col items-center justify-end pointer-events-auto transition-transform ${draggedNodeId === node.id ? 'scale-110 cursor-grabbing z-50' : 'hover:scale-110 cursor-grab'}`}
              style={{
                left: node.x,
                top: node.y,
                transform: `translate(-50%, -100%)`,
                zIndex: draggedNodeId === node.id ? 1000 : Math.floor(node.y)
              }}
              onPointerDown={(e) => handleNodePointerDown(e, node.id)}
            >
              {/* Node Label */}
              <div 
                className="text-white font-medium text-center bg-[#0a0f1a]/90 px-4 py-2 rounded border border-cyan-500/40 shadow-[0_0_15px_rgba(0,242,254,0.2)] mb-2 select-none" 
                style={{ 
                  fontSize: '18px',
                  lineHeight: '1.3',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                {node.name}
              </div>

              {/* Node Image(s) */}
              <div className="relative flex items-end justify-center pointer-events-none" style={{ transform: `scale(${nodeScale})`, transformOrigin: 'bottom center' }}>
                {node.type === 'large' ? (
                  <img src={largeNodeImg} style={{ width: '200px' }} draggable={false} />
                ) : node.type === 'medium' ? (
                  <img src={mediumNodeImg} style={{ width: '150px' }} draggable={false} />
                ) : (
                  <img src={smallNodeImg} style={{ width: '120px' }} draggable={false} />
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Overlay gradient to blend edges */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)]"></div>
    </div>
  );
}
