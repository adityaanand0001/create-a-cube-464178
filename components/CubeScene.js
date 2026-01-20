import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function Cube({ config }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (config.autoRotate && meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={config.scale} position={config.position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={config.color} 
        wireframe={config.wireframe}
        roughness={config.roughness}
        metalness={config.metalness}
      />
    </mesh>
  );
}

function Ball({ config }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (config.autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  if (!config.visible) return null;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={config.scale} position={config.position}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial 
          color={config.color} 
          wireframe={config.wireframe}
          roughness={config.roughness}
          metalness={config.metalness}
        />
      </mesh>
    </Float>
  );
}

export default function CubeScene({ cubeConfig, sphereConfig }) {
  return (
    <div className="w-full h-full bg-slate-50">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[4, 4, 4]} />
        <OrbitControls makeDefault minDistance={2} maxDistance={15} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Cube config={cubeConfig} />
        <Ball config={sphereConfig} />
        
        <ContactShadows 
          position={[0, -1.2, 0]} 
          opacity={0.4} 
          scale={15} 
          blur={2.5} 
          far={4.5} 
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}