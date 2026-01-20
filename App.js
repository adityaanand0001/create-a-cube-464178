import React, { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import Analytics from './pages/Analytics';

export default function App() {
  const [cubeConfig, setCubeConfig] = useState({
    color: '#6366f1',
    scale: 1.2,
    wireframe: false,
    autoRotate: true,
    roughness: 0.5,
    metalness: 0.5,
    position: [0, 0, 0]
  });

  const [sphereConfig, setSphereConfig] = useState({
    visible: true,
    color: '#ec4899',
    scale: 1.5,
    wireframe: true,
    autoRotate: true,
    roughness: 0.2,
    metalness: 0.8,
    position: [0, 0, 0]
  });

  const [systemConfig, setSystemConfig] = useState({
    active: true,
    globalSpeed: 0.5,
    planets: [
      { name: 'Alpha', radius: 4, speed: 0.8, color: '#10b981', size: 0.4, isCube: true },
      { name: 'Beta', radius: 6, speed: 0.5, color: '#f59e0b', size: 0.3, isCube: false },
      { name: 'Gamma', radius: 9, speed: 0.3, color: '#ef4444', size: 0.5, isCube: true },
      { name: 'Delta', radius: 12, speed: 0.2, color: '#8b5cf6', size: 0.2, isCube: false },
    ]
  });

  return (
    <Router>
      <Layout cubeConfig={cubeConfig}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                cubeConfig={cubeConfig} 
                setCubeConfig={setCubeConfig} 
                sphereConfig={sphereConfig}
                setSphereConfig={setSphereConfig}
                systemConfig={systemConfig}
                setSystemConfig={setSystemConfig}
              />
            } 
          />
          <Route path="/docs" element={<Documentation />} />
          <Route 
            path="/analytics" 
            element={<Analytics cubeConfig={cubeConfig} sphereConfig={sphereConfig} systemConfig={systemConfig} />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}
