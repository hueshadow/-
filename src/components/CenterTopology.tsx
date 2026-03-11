import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { Activity } from 'lucide-react';

const iconSvg = 'image://data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTYwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0idG9wIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRhOGRmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZTVmZTUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxlZnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWU1ZmU1Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBhMmE3YSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icmlnaHQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMmQ3M2Y1Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzEwM2I5ZSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGVsbGlwc2UgY3g9IjUwIiBjeT0iMTQwIiByeD0iMzAiIHJ5PSIxMiIgZmlsbD0icmdiYSgwLCAyNTUsIDI1NSwgMC4xNSkiLz4KICA8ZWxsaXBzZSBjeD0iNTAiIGN5PSIxNDAiIHJ4PSIxNSIgcnk9IjYiIGZpbGw9InJnYmEoMCwgMjU1LCAyNTUsIDAuNCkiLz4KICA8ZWxsaXBzZSBjeD0iNTAiIGN5PSIxNDAiIHJ4PSI1IiByeT0iMiIgZmlsbD0icmdiYSgwLCAyNTUsIDI1NSwgMC44KSIvPgogIDxsaW5lIHgxPSI1MCIgeTE9IjkwIiB4Mj0iNTAiIHkyPSIxNDAiIHN0cm9rZT0iIzAwZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjMsMyIgb3BhY2l0eT0iMC42Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI1MCwxNSA5MCwzMCA1MCw0NSAxMCwzMCIgZmlsbD0idXJsKCN0b3ApIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIxMCwzMCA1MCw0NSA1MCw2NSAxMCw1MCIgZmlsbD0idXJsKCNsZWZ0KSIvPgogIDxwb2x5Z29uIHBvaW50cz0iNTAsNDUgOTAsMzAgOTAsNTAgNTAsNjUiIGZpbGw9InVybCgjcmlnaHQpIi8+CiAgPHBvbHlnb24gcG9pbnRzPSIxMCw1NSA1MCw3MCA5MCw1NSA1MCw0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgb3BhY2l0eT0iMC42Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSIxNSw2MCA1MCw3MyA1MCw5MCIgZmlsbD0idXJsKCNsZWZ0KSIvPgogIDxwb2x5Z29uIHBvaW50cz0iNTAsNzMgODUsNjAgNTAsOTAiIGZpbGw9InVybCgjcmlnaHQpIi8+Cjwvc3ZnPg==';

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
      { name: '南京汇聚', value: [118.7969, 32.0603], symbolSize: 18 },
      { name: '江都集控中心', value: [119.5532, 32.4255], symbolSize: 18 },
      // Mid Level
      { name: '宿迁汇聚', value: [118.2751, 33.9630], symbolSize: 14 },
      { name: '徐州汇聚\n10.32.61.13', value: [117.1848, 34.2617], symbolSize: 14 },
      { name: '淮安汇聚\n10.32.62.101', value: [119.0153, 33.6103], symbolSize: 14 },
      { name: '扬州汇聚\n10.32.67.73', value: [119.3129, 32.2942], symbolSize: 14 },
      // Bottom Level - Suqian
      { name: '皂河站', value: [118.10, 34.20], symbolSize: 10 },
      { name: '泗洪站', value: [118.20, 33.50], symbolSize: 10 },
      { name: '睢宁二站', value: [117.90, 33.90], symbolSize: 10 },
      { name: '宿迁一站', value: [118.30, 34.10], symbolSize: 10 },
      { name: '宿迁二站', value: [118.40, 33.80], symbolSize: 10 },
      { name: '宿迁三站', value: [118.15, 33.70], symbolSize: 10 },
      // Bottom Level - Xuzhou
      { name: '邳州站', value: [117.90, 34.30], symbolSize: 10 },
      { name: '新沂站', value: [118.30, 34.40], symbolSize: 10 },
      { name: '徐州一站', value: [117.20, 34.50], symbolSize: 10 },
      { name: '徐州二站', value: [117.30, 34.10], symbolSize: 10 },
      { name: '徐州三站', value: [117.00, 34.00], symbolSize: 10 },
      // Bottom Level - Huaian
      { name: '淮安一站', value: [119.10, 33.80], symbolSize: 10 },
      { name: '淮安二站', value: [119.20, 33.50], symbolSize: 10 },
      { name: '淮安三站', value: [118.90, 33.40], symbolSize: 10 },
      { name: '淮安四站', value: [118.80, 33.70], symbolSize: 10 },
      // Bottom Level - Yangzhou
      { name: '扬州一站', value: [119.40, 32.50], symbolSize: 10 },
      { name: '扬州二站', value: [119.50, 32.20], symbolSize: 10 },
      { name: '扬州三站', value: [119.20, 32.10], symbolSize: 10 },
      { name: '扬州四站', value: [119.10, 32.40], symbolSize: 10 },
    ];

    const linesData = [
      // Top to Mid
      { coords: [[118.7969, 32.0603], [118.2751, 33.9630]] }, // Nanjing -> Suqian
      { coords: [[118.7969, 32.0603], [117.1848, 34.2617]] }, // Nanjing -> Xuzhou
      { coords: [[119.5532, 32.4255], [119.0153, 33.6103]] }, // Jiangdu -> Huaian
      { coords: [[119.5532, 32.4255], [119.3129, 32.2942]] }, // Jiangdu -> Yangzhou
      // Mid to Bottom - Suqian
      { coords: [[118.2751, 33.9630], [118.10, 34.20]] },
      { coords: [[118.2751, 33.9630], [118.20, 33.50]] },
      { coords: [[118.2751, 33.9630], [117.90, 33.90]] },
      { coords: [[118.2751, 33.9630], [118.30, 34.10]] },
      { coords: [[118.2751, 33.9630], [118.40, 33.80]] },
      { coords: [[118.2751, 33.9630], [118.15, 33.70]] },
      // Mid to Bottom - Xuzhou
      { coords: [[117.1848, 34.2617], [117.90, 34.30]] },
      { coords: [[117.1848, 34.2617], [118.30, 34.40]] },
      { coords: [[117.1848, 34.2617], [117.20, 34.50]] },
      { coords: [[117.1848, 34.2617], [117.30, 34.10]] },
      { coords: [[117.1848, 34.2617], [117.00, 34.00]] },
      // Mid to Bottom - Huaian
      { coords: [[119.0153, 33.6103], [119.10, 33.80]] },
      { coords: [[119.0153, 33.6103], [119.20, 33.50]] },
      { coords: [[119.0153, 33.6103], [118.90, 33.40]] },
      { coords: [[119.0153, 33.6103], [118.80, 33.70]] },
      // Mid to Bottom - Yangzhou
      { coords: [[119.3129, 32.2942], [119.40, 32.50]] },
      { coords: [[119.3129, 32.2942], [119.50, 32.20]] },
      { coords: [[119.3129, 32.2942], [119.20, 32.10]] },
      { coords: [[119.3129, 32.2942], [119.10, 32.40]] },
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
            color: '#00ff88',
            symbolSize: 3
          },
          lineStyle: {
            color: '#00ff88',
            width: 0, // Hide the base line, only show the effect
            opacity: 0,
            curveness: 0.1
          },
          data: linesData
        },
        // Nodes
        {
          name: '节点',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          silent: true, // Disable hover/click events
          symbol: iconSvg,
          symbolSize: (val: any, params: any) => params.data.symbolSize * 3.5,
          symbolOffset: [0, '-35%'],
          itemStyle: {
            shadowBlur: 10,
            shadowColor: '#00ffff'
          },
          label: {
            show: true,
            formatter: '{b}',
            position: 'top',
            color: '#ffffff',
            fontSize: 11,
            fontWeight: 'bold',
            distance: 0,
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
