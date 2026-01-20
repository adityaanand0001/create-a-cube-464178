import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function Analytics({ cubeConfig, sphereConfig, systemConfig }) {
  const radarData = systemConfig.planets.map(p => ({
    subject: p.name,
    A: p.radius * 10,
    B: p.speed * 100,
    fullMark: 150,
  }));

  return (
    <div className="p-12 w-full h-full overflow-y-auto bg-white">
      <div className="max-w-6xl">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight italic">Cosmic Telemetry</h1>
          <p className="text-slate-500 mt-2">System-wide orbital analysis and primitive metrics.</p>
        </header>

        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="p-6 bg-slate-50 rounded-[6px] border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Bodies</p>
            <p className="text-2xl font-mono text-indigo-600">{systemConfig.planets.length + 1}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-[6px] border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Global Velocity</p>
            <p className="text-2xl font-mono text-pink-500">{systemConfig.globalSpeed}c</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-[6px] border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">System Radius</p>
            <p className="text-2xl font-mono text-slate-700">12.0 AU</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-[6px] border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Core Mass</p>
            <p className="text-2xl font-mono text-slate-700">{cubeConfig.scale.toFixed(1)} M☉</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[450px] border border-slate-100 p-8 rounded-[6px] bg-slate-50/30">
            <h3 className="text-sm font-bold text-slate-800 mb-8 uppercase tracking-wider">Orbital Distribution (Radius vs Speed)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="System" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                <Radar name="Velocity" dataKey="B" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[450px] border border-slate-100 p-8 rounded-[6px]">
            <h3 className="text-sm font-bold text-slate-800 mb-8 uppercase tracking-wider">Planetary Scale Comparison</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={systemConfig.planets}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '6px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="size" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}