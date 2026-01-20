import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, FileText, BarChart3, Settings, Github } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Box, label: 'Workspace' },
    { path: '/analytics', icon: BarChart3, label: 'Metrics' },
    { path: '/docs', icon: FileText, label: 'Docs' },
  ];

  return (
    <div className="flex h-screen w-screen bg-slate-50 text-slate-900 overflow-hidden font-sans antialiased">
      {/* Sidebar - Asymmetrical narrow width */}
      <aside className="w-20 border-r border-slate-200 flex flex-col items-center py-8 bg-white z-20">
        <div className="mb-12 text-indigo-600">
          <Box size={32} strokeWidth={2.5} />
        </div>
        
        <nav className="flex flex-col gap-8 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded-[6px] transition-all duration-200 ${
                location.pathname === item.path 
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={22} />
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-6 text-slate-400">
          <button className="hover:text-slate-600 transition-colors"><Settings size={20} /></button>
          <button className="hover:text-slate-600 transition-colors"><Github size={20} /></button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}