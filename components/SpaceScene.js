import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      p.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return p;
  }, [radius]);

  return <Line points={points} color="#e2e8f0" lineWidth={0.5} transparent opacity={0.5} />;
}

function CelestialBody({ radius, speed, color, size, label, isCube }) {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x += 0.005;
    }
  });

  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          {isCube ? <boxGeometry args={[size, size, size]} /> : <sphereGeometry args={[size, 32, 32]} />}
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Text
        position={[0, size + 0.3, 0]}
        fontSize={0.15}
        color="#64748b"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        {label}
      </Text>
    </group>
  );
}

export default function SpaceScene({ cubeConfig, sphereConfig, systemConfig }) {
  return (
    <div className="w-full h-full bg-[#f8fafc]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={45} />
        <OrbitControls makeDefault minDistance={5} maxDistance={30} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#fff" />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        {/* Central Core */}
        <group>
           <mesh scale={cubeConfig.scale}>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial 
               color={cubeConfig.color} 
               wireframe={cubeConfig.wireframe}
               emissive={cubeConfig.color}
               emissiveIntensity={0.5}
             />
           </mesh>
           {sphereConfig.visible && (
             <mesh scale={sphereConfig.scale} position={[0, 0, 0]}>
               <sphereGeometry args={[0.8, 64, 64]} />
               <meshStandardMaterial 
                 color={sphereConfig.color} 
                 wireframe={sphereConfig.wireframe}
                 transparent
                 opacity={0.4}
               />
             </mesh>
           )}
        </group>

        {/* System Orbits */}
        {systemConfig.active && systemConfig.planets.map((p, i) => (
          <React.Fragment key={i}>
            <OrbitRing radius={p.radius} />
            <CelestialBody 
              radius={p.radius} 
              speed={p.speed * systemConfig.globalSpeed} 
              color={p.color} 
              size={p.size} 
              label={p.name}
              isCube={p.isCube}
            />
          </React.Fragment>
        ))}
      </Canvas>
    </div>
  );
}
