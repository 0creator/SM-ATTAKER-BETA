import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  // Simple Router based on state
  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.SIGNALS:
        return (
            <div className="p-8 flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-300">Detailed Signals View</h2>
                    <p>Coming in Phase 9.1 update</p>
                </div>
            </div>
        );
      case ViewState.COPILOT:
         // Reusing Dashboard for now as it contains the Copilot, 
         // but ideally this would be a full-screen chat experience.
         return <Dashboard />; 
      default:
        return (
            <div className="p-8 flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-300">Module Under Construction</h2>
                    <p>Phase 8 dependencies required.</p>
                </div>
            </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 overflow-hidden relative">
        {/* Background Grid Pattern for Aesthetics */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }} 
        />
        
        <div className="relative z-10 h-full">
            {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;