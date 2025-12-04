import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from './StatCard';
import SignalCard from './SignalCard';
import ChatCopilot from './ChatCopilot';
import { Signal, PnLDataPoint } from '../types';
import { AlertTriangle, Activity } from 'lucide-react';

// Mock Data
const MOCK_PNL_DATA: PnLDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  value: 1000 + Math.random() * 500 + (i * 50),
}));

const MOCK_SIGNALS: Signal[] = [
  {
    id: '1',
    asset: 'BTC/USDT',
    direction: 'LONG',
    confidence: 0.92,
    timestamp: new Date().toISOString(),
    rationaleShort: 'Order Block identified at 63k support. Momentum crossover on 4H confirmed by RSI divergence.',
    agentSource: 'CryptoMetaLearner'
  },
  {
    id: '2',
    asset: 'ETH/USDT',
    direction: 'SHORT',
    confidence: 0.78,
    timestamp: new Date().toISOString(),
    rationaleShort: 'Rejected from 4H bearish FVG. Volume profile indicates thinning demand.',
    agentSource: 'CryptoMetaLearner'
  },
  {
    id: '3',
    asset: 'SOL/USDT',
    direction: 'LONG',
    confidence: 0.85,
    timestamp: new Date().toISOString(),
    rationaleShort: 'Liquidity sweep of previous week low followed by aggressive buying.',
    agentSource: 'ScalpAgent'
  }
];

const Dashboard: React.FC = () => {
  const [pnlData, setPnlData] = useState<PnLDataPoint[]>(MOCK_PNL_DATA);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPnlData(current => {
        const lastVal = current[current.length - 1].value;
        const newVal = lastVal + (Math.random() - 0.45) * 50; // Random walk with slight upward bias
        const nextTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const newData = [...current.slice(1), { time: nextTime, value: newVal }];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const currentPnL = pnlData[pnlData.length - 1].value;
  const startPnL = pnlData[0].value;
  const pnlChange = ((currentPnL - startPnL) / startPnL) * 100;

  return (
    <div className="p-8 h-full overflow-y-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">System Overview</h2>
        <p className="text-gray-400">Real-time monitoring of Phase 9 deployment</p>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Net PnL (24h)" 
          value={`$${currentPnL.toFixed(2)}`} 
          change={Number(pnlChange.toFixed(2))} 
        />
        <StatCard 
          label="Sharpe Ratio" 
          value="2.45" 
          change={1.2} 
          subtext="Rolling 7-day window"
        />
        <StatCard 
          label="Max Drawdown" 
          value="-4.2%" 
          change={-0.5} 
          positiveIsGood={false}
          subtext="Within safety limits"
        />
        <StatCard 
          label="Market Regime" 
          value="VOLATILE" 
          subtext="Meta-Learner adapting weights"
          positiveIsGood={true} // Neutral
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Main Chart Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Chart Container */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex-1 min-h-[300px]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-200 font-semibold flex items-center gap-2">
                  <Activity size={18} className="text-indigo-400"/>
                  Equity Curve
                </h3>
                <div className="flex gap-2">
                   {['1H', '4H', '1D', '1W'].map(tf => (
                      <button key={tf} className="px-3 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        {tf}
                      </button>
                   ))}
                </div>
             </div>
             
             <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlData}>
                    <defs>
                      <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
                      itemStyle={{ color: '#818cf8' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorPnL)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Drift / Warning Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-[250px]">
             <h3 className="text-gray-200 font-semibold flex items-center gap-2 mb-4">
                <AlertTriangle size={18} className="text-amber-500"/>
                System Health & Drift
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Feature Drift (Order Flow)</span>
                    <span className="text-sm font-mono text-emerald-400">0.04 (STABLE)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '4%' }}></div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-400">Concept Drift (Volatility)</span>
                    <span className="text-sm font-mono text-amber-400">0.28 (WARNING)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>

                <div className="mt-4 p-3 bg-gray-950/50 rounded-lg border border-gray-800/50">
                    <p className="text-xs text-gray-500">
                        <span className="text-indigo-400 font-bold">AUTO-RETRAINING:</span> Incremental trainer scheduled in 2h 15m due to elevated volatility metrics.
                    </p>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Signals & Copilot */}
        <div className="flex flex-col gap-6">
            {/* Top Signals */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex-none">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-200 font-semibold">Top Opportunities</h3>
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">Redis Cached</span>
                </div>
                <div className="space-y-3">
                    {MOCK_SIGNALS.map(signal => (
                        <SignalCard key={signal.id} signal={signal} />
                    ))}
                </div>
            </div>

            {/* AI Copilot Mini View */}
            <div className="flex-1 min-h-[400px]">
                <ChatCopilot />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;