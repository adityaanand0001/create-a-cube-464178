import React, { useState } from 'react';
import SpaceScene from '../components/SpaceScene';
import { motion } from 'framer-motion';
import { Maximize2, RotateCw, Palette, Layers, Zap, Circle, Box as BoxIcon, Globe } from 'lucide-react';

export default function Dashboard({ cubeConfig, setCubeConfig, sphereConfig, setSphereConfig, systemConfig, setSystemConfig }) {
  const [activeTab, setActiveTab] = useState('system');

  const updateCube = (key, value) => setCubeConfig(prev => ({ ...prev, [key]: value }));
  const updateSphere = (key, value) => setSphereConfig(prev => ({ ...prev, [key]: value }));
  const updateSystem = (key, value) => setSystemConfig(prev => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-1 w-full h-full">
      <div className="flex-[2.5] relative border-r border-slate-200 overflow-hidden">
        <div className="absolute top-8 left-8 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md p-6 rounded-[6px] border border-slate-200 shadow-sm max-w-xs"
          >
            <h1 className="text-xl font-bold text-slate-900 mb-1 tracking-tight italic">Celestial Workspace</h1>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              A multi-body solar system simulation centered around your core primitives. Adjust orbital velocities and planetary scales.
            </p>
          </motion.div>
        </div>

        <SpaceScene cubeConfig={cubeConfig} sphereConfig={sphereConfig} systemConfig={systemConfig} />
      </div>

      <div className="flex-1 bg-white p-10 overflow-y-auto min-w-[380px]">
        <div className="max-w-md">
          <div className="flex gap-2 mb-10 p-1 bg-slate-50 rounded-[6px]">
            <button 
              onClick={() => setActiveTab('system')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-[4px] ${activeTab === 'system' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Globe size={14} /> System
            </button>
            <button 
              onClick={() => setActiveTab('core')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-[4px] ${activeTab === 'core' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <BoxIcon size={14} /> Core
            </button>
          </div>

          {activeTab === 'system' ? (
            <div className="space-y-10">
              <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8">Orbital Mechanics</h2>
              
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <RotateCw size={16} className="text-indigo-500" />
                    <label className="text-sm font-semibold text-slate-700">System Velocity</label>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{systemConfig.globalSpeed.toFixed(2)}x</span>
                </div>
                <input 
                  type="range" min="0" max="2" step="0.05"
                  value={systemConfig.globalSpeed}
                  onChange={(e) => updateSystem('globalSpeed', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </section>

              <section className="space-y-6">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Planetary Bodies</label>
                {systemConfig.planets.map((planet, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-[6px] border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: planet.color }} />
                      <span className="text-sm font-medium text-slate-700">{planet.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-mono text-slate-400">R:{planet.radius}</span>
                      <span className="text-[10px] font-mono text-slate-400">V:{planet.speed}</span>
                    </div>
                  </div>
                ))}
              </section>

              <button 
                onClick={() => updateSystem('active', !systemConfig.active)}
                className={`w-full py-4 rounded-[6px] border font-bold text-xs uppercase tracking-widest transition-all ${systemConfig.active ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-400 border-slate-200'}`}
              >
                {systemConfig.active ? 'Deactivate System' : 'Initialize System'}
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              <h2 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8">Core Primitives</h2>
              
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Palette size={16} className="text-indigo-500" />
                  <label className="text-sm font-semibold text-slate-700">Core Hue</label>
                </div>
                <div className="flex gap-3">
                  {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#000000'].map(c => (
                    <button 
                      key={c}
                      onClick={() => updateCube('color', c)}
                      className={`w-10 h-10 rounded-[6px] border-2 transition-transform ${cubeConfig.color === c ? 'border-indigo-600 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-4">
                   <label className="text-sm font-semibold text-slate-700">Core Scale</label>
                   <span className="text-xs font-mono text-slate-400">{cubeConfig.scale}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="3" step="0.1"
                  value={cubeConfig.scale}
                  onChange={(e) => updateCube('scale', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </section>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[6px]">
                  <span className="text-sm font-semibold text-slate-700">Atmospheric Sphere</span>
                  <button 
                    onClick={() => updateSphere('visible', !sphereConfig.visible)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${sphereConfig.visible ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${sphereConfig.visible ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-[6px]">
                  <span className="text-sm font-semibold text-slate-700">Wireframe View</span>
                  <button 
                    onClick={() => updateCube('wireframe', !cubeConfig.wireframe)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${cubeConfig.wireframe ? 'bg-indigo-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${cubeConfig.wireframe ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
