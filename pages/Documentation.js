import React from 'react';
import { BookOpen, Code, Terminal, Cpu } from 'lucide-react';

export default function Documentation() {
  return (
    <div className="p-16 w-full h-full overflow-y-auto bg-white">
      <div className="max-w-4xl">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4 block">Technical Manual</span>
        <h1 className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">The Cube: An Analysis</h1>
        
        <p className="text-xl text-slate-500 leading-relaxed mb-12">
          In geometry, a cube is a three-dimensional solid object bounded by six square faces, facets or sides, 
          with three meeting at each vertex. It is the only regular hexahedron and is one of the five Platonic solids.
        </p>

        <div className="grid grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 text-indigo-600 rounded-[6px]"><Terminal size={18} /></div>
              <h3 className="font-bold text-slate-800">Euler's Formula</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              For any convex polyhedron, the number of Faces (F), Vertices (V), and Edges (E) are related by: V - E + F = 2.
              For a cube: 8 - 12 + 6 = 2.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 text-indigo-600 rounded-[6px]"><Cpu size={18} /></div>
              <h3 className="font-bold text-slate-800">GPU Acceleration</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              The cube is rendered using WebGL 2.0 via Three.js. Each frame involves a vertex shader transforming 8 points 
              and a fragment shader calculating PBR lighting for approximately 2 million pixels.
            </p>
          </div>
        </div>

        <section className="bg-slate-50 p-10 rounded-[6px] border border-slate-100">
           <div className="flex items-center gap-2 mb-6">
             <Code size={20} className="text-slate-400" />
             <h2 className="font-bold text-slate-800">Component Usage</h2>
           </div>
           <pre className="bg-slate-900 text-slate-300 p-6 rounded-[6px] overflow-x-auto text-sm font-mono leading-relaxed">
{`import { Box } from '@react-three/drei';

function MyScene() {
  return (
    <Box args={[1, 1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#6366f1" 
        roughness={0.1} 
      />
    </Box>
  );
}`}
           </pre>
        </section>
      </div>
    </div>
  );
}