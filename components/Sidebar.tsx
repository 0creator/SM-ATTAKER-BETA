import React from 'react';
import { LayoutDashboard, Radio, Bot, Activity, Settings, Terminal } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Mission Control', icon: LayoutDashboard },
    { id: ViewState.SIGNALS, label: 'Live Signals', icon: Radio },
    { id: ViewState.COPILOT, label: 'AI Copilot', icon: Bot },
    { id: ViewState.DRIFT, label: 'Drift Monitor', icon: Activity },
    { id: ViewState.SETTINGS, label: 'System Config', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-gray-950 border-r border-gray-800 flex flex-col sticky top-0">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <Terminal size={20} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-100 tracking-wider">SM_ATTAKER</h1>
          <span className="text-xs text-indigo-400 font-mono">v0.9.2 BETA</span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group ${
                isActive
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-900/50'
                  : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
              }`}
            >
              <item.icon
                size={18}
                className={`${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'}`}
              />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-400 font-mono">SYSTEM ONLINE</span>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Latency: 24ms<br/>
            Uptime: 14d 02h
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;