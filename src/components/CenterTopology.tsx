import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Activity } from 'lucide-react';

const createIsometricNode = (color: 'blue' | 'red' | 'green', icon: 'server' | 'router') => {
  const isRed = color === 'red';
  const isGreen = color === 'green';
  
  const baseStroke = isRed ? '#ff4d4f' : isGreen ? '#52c41a' : '#00ffff';
  const baseTop = isRed ? '#5c0011' : isGreen ? '#092b00' : '#002347';
  const baseLeft = isRed ? '#3f000a' : isGreen ? '#051c00' : '#001328';
  const baseRight = isRed ? '#2a0006' : isGreen ? '#020e00' : '#000b18';

  const topStroke = isRed ? '#ff7875' : isGreen ? '#73d13d' : '#40a9ff';
  const topTop = isRed ? '#a8071a' : isGreen ? '#237804' : '#0050b3';
  const topLeft = isRed ? '#820014' : isGreen ? '#135200' : '#003a8c';
  const topRight = isRed ? '#5c0011' : isGreen ? '#092b00' : '#002766';

  const iconColorTop = isRed ? '#ffc069' : isGreen ? '#95de64' : '#69c0ff';
  const iconColorLeft = isRed ? '#fa8c16' : isGreen ? '#5b8c00' : '#1890ff';
  const iconColorRight = isRed ? '#d46b08' : isGreen ? '#3f6600' : '#096dd9';

  let iconSvg = '';
  if (icon === 'server') {
    iconSvg = `
      <!-- Server Icon -->
      <polygon points="100,55 130,70 100,85 70,70" fill="${iconColorTop}" />
      <polygon points="70,70 100,85 100,125 70,110" fill="${iconColorLeft}" />
      <polygon points="130,70 100,85 100,125 130,110" fill="${iconColorRight}" />
      <!-- Server slots -->
      <line x1="76" y1="84" x2="94" y2="93" stroke="#fff" stroke-width="2" opacity="0.6"/>
      <line x1="76" y1="94" x2="94" y2="103" stroke="#fff" stroke-width="2" opacity="0.6"/>
      <line x1="76" y1="104" x2="94" y2="113" stroke="#fff" stroke-width="2" opacity="0.6"/>
      
      <line x1="124" y1="84" x2="106" y2="93" stroke="#fff" stroke-width="2" opacity="0.6"/>
      <line x1="124" y1="94" x2="106" y2="103" stroke="#fff" stroke-width="2" opacity="0.6"/>
      <line x1="124" y1="104" x2="106" y2="113" stroke="#fff" stroke-width="2" opacity="0.6"/>
    `;
  } else {
    // Router icon
    iconSvg = `
      <!-- Router Icon -->
      <polygon points="100,75 140,95 100,115 60,95" fill="${iconColorTop}" />
      <polygon points="60,95 100,115 100,125 60,105" fill="${iconColorLeft}" />
      <polygon points="140,95 100,115 100,125 140,105" fill="${iconColorRight}" />
      <!-- Antennas -->
      <line x1="70" y1="100" x2="70" y2="50" stroke="${iconColorTop}" stroke-width="4" stroke-linecap="round"/>
      <line x1="130" y1="100" x2="130" y2="50" stroke="${iconColorTop}" stroke-width="4" stroke-linecap="round"/>
      <!-- Antenna tips -->
      <circle cx="70" cy="50" r="3" fill="#fff" opacity="0.8"/>
      <circle cx="130" cy="50" r="3" fill="#fff" opacity="0.8"/>
    `;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 230">
    <!-- Base Tier -->
    <polygon points="100,130 180,170 100,210 20,170" fill="${baseTop}" stroke="${baseStroke}" stroke-width="2"/>
    <polygon points="20,170 100,210 100,225 20,185" fill="${baseLeft}" />
    <polygon points="180,170 100,210 100,225 180,185" fill="${baseRight}" />
    
    <!-- Top Tier -->
    <polygon points="100,110 160,140 100,170 40,140" fill="${topTop}" stroke="${topStroke}" stroke-width="1.5"/>
    <polygon points="40,140 100,170 100,180 40,150" fill="${topLeft}" />
    <polygon points="160,140 100,170 100,180 160,150" fill="${topRight}" />
    
    ${iconSvg}
  </svg>`;

  return `image://data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const blueServer = createIsometricNode('blue', 'server');
const blueRouter = createIsometricNode('blue', 'router');
const redServer = createIsometricNode('red', 'server');
const redRouter = createIsometricNode('red', 'router');
const greenServer = createIsometricNode('green', 'server');

export default function CenterTopology() {
  const [geoJsonLoaded, setGeoJsonLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch China GeoJSON from a reliable CDN
    fetch('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/china.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        echarts.registerMap('china', data);
        setGeoJsonLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load map data:', err);
        setError('地图数据加载失败，请检查网络连接或跨域设置。');
      });
  }, []);

  const getOption = () => {
    const nodesData = [
      // Top Level
      { name: '南京汇聚', value: [118.7969, 32.0603], symbol: blueRouter, symbolSize: 22 },
      { name: '江都集控中心', value: [119.5532, 32.4255], symbol: blueRouter, symbolSize: 22 },
      // Mid Level
      { name: '宿迁汇聚', value: [118.2751, 33.9630], symbol: blueServer, symbolSize: 18 },
      { name: '徐州汇聚\n10.32.61.13', value: [117.1848, 34.2617], symbol: redServer, symbolSize: 18 },
      { name: '淮安汇聚\n10.32.62.101', value: [119.0153, 33.6103], symbol: blueServer, symbolSize: 18 },
      { name: '扬州汇聚\n10.32.67.73', value: [119.3129, 32.2942], symbol: greenServer, symbolSize: 18 },
      // Bottom Level - Suqian
      { name: '皂河站', value: [118.10, 34.20], symbol: blueServer, symbolSize: 14 },
      { name: '泗洪站', value: [118.20, 33.50], symbol: redRouter, symbolSize: 14 },
      { name: '睢宁二站', value: [117.90, 33.90], symbol: blueServer, symbolSize: 14 },
      { name: '宿迁一站', value: [118.30, 34.10], symbol: blueServer, symbolSize: 14 },
      { name: '宿迁二站', value: [118.40, 33.80], symbol: blueServer, symbolSize: 14 },
      { name: '宿迁三站', value: [118.15, 33.70], symbol: blueServer, symbolSize: 14 },
      // Bottom Level - Xuzhou
      { name: '邳州站', value: [117.90, 34.30], symbol: redServer, symbolSize: 14 },
      { name: '新沂站', value: [118.30, 34.40], symbol: redServer, symbolSize: 14 },
      { name: '徐州一站', value: [117.20, 34.50], symbol: redServer, symbolSize: 14 },
      { name: '徐州二站', value: [117.30, 34.10], symbol: redServer, symbolSize: 14 },
      { name: '徐州三站', value: [117.00, 34.00], symbol: redServer, symbolSize: 14 },
      // Bottom Level - Huaian
      { name: '淮安一站', value: [119.10, 33.80], symbol: blueServer, symbolSize: 14 },
      { name: '淮安二站', value: [119.20, 33.50], symbol: blueServer, symbolSize: 14 },
      { name: '淮安三站', value: [118.90, 33.40], symbol: blueServer, symbolSize: 14 },
      { name: '淮安四站', value: [118.80, 33.70], symbol: blueServer, symbolSize: 14 },
      // Bottom Level - Yangzhou
      { name: '扬州一站', value: [119.40, 32.50], symbol: greenServer, symbolSize: 14 },
      { name: '扬州二站', value: [119.50, 32.20], symbol: greenServer, symbolSize: 14 },
      { name: '扬州三站', value: [119.20, 32.10], symbol: greenServer, symbolSize: 14 },
      { name: '扬州四站', value: [119.10, 32.40], symbol: greenServer, symbolSize: 14 },
    ];

    const linesData = [
      // Top to Mid
      { coords: [[118.7969, 32.0603], [118.2751, 33.9630]], lineStyle: { color: '#00ffff' } },
      { coords: [[118.7969, 32.0603], [117.1848, 34.2617]], lineStyle: { color: '#ff4d4f' } },
      { coords: [[119.5532, 32.4255], [119.0153, 33.6103]], lineStyle: { color: '#00ffff' } },
      { coords: [[119.5532, 32.4255], [119.3129, 32.2942]], lineStyle: { color: '#52c41a' } },
      // Mid to Bottom - Suqian
      { coords: [[118.2751, 33.9630], [118.10, 34.20]], lineStyle: { color: '#00ffff' } },
      { coords: [[118.2751, 33.9630], [118.20, 33.50]], lineStyle: { color: '#ff4d4f' } },
      { coords: [[118.2751, 33.9630], [117.90, 33.90]], lineStyle: { color: '#00ffff' } },
      { coords: [[118.2751, 33.9630], [118.30, 34.10]], lineStyle: { color: '#00ffff' } },
      { coords: [[118.2751, 33.9630], [118.40, 33.80]], lineStyle: { color: '#00ffff' } },
      { coords: [[118.2751, 33.9630], [118.15, 33.70]], lineStyle: { color: '#00ffff' } },
      // Mid to Bottom - Xuzhou (Red)
      { coords: [[117.1848, 34.2617], [117.90, 34.30]], lineStyle: { color: '#ff4d4f' } },
      { coords: [[117.1848, 34.2617], [118.30, 34.40]], lineStyle: { color: '#ff4d4f' } },
      { coords: [[117.1848, 34.2617], [117.20, 34.50]], lineStyle: { color: '#ff4d4f' } },
      { coords: [[117.1848, 34.2617], [117.30, 34.10]], lineStyle: { color: '#ff4d4f' } },
      { coords: [[117.1848, 34.2617], [117.00, 34.00]], lineStyle: { color: '#ff4d4f' } },
      // Mid to Bottom - Huaian
      { coords: [[119.0153, 33.6103], [119.10, 33.80]], lineStyle: { color: '#00ffff' } },
      { coords: [[119.0153, 33.6103], [119.20, 33.50]], lineStyle: { color: '#00ffff' } },
      { coords: [[119.0153, 33.6103], [118.90, 33.40]], lineStyle: { color: '#00ffff' } },
      { coords: [[119.0153, 33.6103], [118.80, 33.70]], lineStyle: { color: '#00ffff' } },
      // Mid to Bottom - Yangzhou (Green)
      { coords: [[119.3129, 32.2942], [119.40, 32.50]], lineStyle: { color: '#52c41a' } },
      { coords: [[119.3129, 32.2942], [119.50, 32.20]], lineStyle: { color: '#52c41a' } },
      { coords: [[119.3129, 32.2942], [119.20, 32.10]], lineStyle: { color: '#52c41a' } },
      { coords: [[119.3129, 32.2942], [119.10, 32.40]], lineStyle: { color: '#52c41a' } },
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: {
        show: false // Disable tooltip
      },
      geo: {
        map: 'china',
        roam: true, // Enable zoom and pan
        silent: true, // Disable hover/click effects on the map regions
        zoom: 7.5, // Increased zoom to fill more space
        center: [119.4685, 33.0000], // Center of Jiangsu
        top: '-10%', // Move map up to reach the very top
        label: {
          show: false,
          color: '#8b8898'
        },
        itemStyle: {
          areaColor: '#14121c',
          borderColor: '#2a263d',
          borderWidth: 1
        }
      },
      series: [
        // Static Lines
        {
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 1,
          silent: true, // Disable hover/click events
          lineStyle: {
            color: '#2a263d',
            width: 1,
            opacity: 0.6,
            curveness: 0.1
          },
          data: linesData
        },
        // Animated Lines (Particles)
        {
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          silent: true, // Disable hover/click events
          effect: {
            show: true,
            period: 4,
            trailLength: 0.2,
            symbolSize: 3
          },
          lineStyle: {
            width: 0, // Hide the base line, only show the effect
            opacity: 0,
            curveness: 0.1
          },
          data: linesData.map(item => ({
            ...item,
            effect: {
              color: item.lineStyle.color // Match particle color to line color
            }
          }))
        },
        // Nodes
        {
          name: '节点',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          silent: true, // Disable hover/click events
          symbolSize: (val: any, params: any) => params.data.symbolSize * 12,
          symbolOffset: [0, '-25%'],
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.5)'
          },
          label: {
            show: true,
            formatter: '{b}',
            position: 'bottom',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 'bold',
            distance: 5,
            textShadowColor: '#000',
            textShadowBlur: 4
          },
          data: nodesData
        }
      ]
    };
  };

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-auto">
        {geoJsonLoaded ? (
          <div 
            className="absolute inset-0" 
            style={{
              transform: 'perspective(1200px) rotateX(45deg) scale(1.6) translateY(-5%)',
              transformOrigin: 'center 50%',
              transition: 'transform 0.5s ease-in-out'
            }}
          >
            <ReactECharts
              option={getOption()}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-400">
            {error}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
            <Activity className="w-8 h-8 animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Overlay gradient to blend edges */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)]"></div>
    </>
  );
}
