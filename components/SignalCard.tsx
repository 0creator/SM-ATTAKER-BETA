import React from 'react';
import { Signal } from '../types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SignalCardProps {
  signal: Signal;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  const isLong = signal.direction === 'LONG';
  const isShort = signal.direction === 'SHORT';
  
  const borderColor = isLong ? 'border-emerald-500/20' : isShort ? 'border-rose-500/20' : 'border-gray-700';
  const textColor = isLong ? 'text-emerald-400' : isShort ? 'text-rose-400' : 'text-gray-400';
  const bgColor = isLong ? 'bg-emerald-500/5' : isShort ? 'bg-rose-500/5' : 'bg-gray-800/50';

  return (
    <div className={`border ${borderColor} ${bgColor} rounded-lg p-4 relative overflow-hidden transition-all hover:scale-[1.01]`}>
      {/* Decorative glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 blur-[50px] rounded-full opacity-20 -mr-10 -mt-10 ${isLong ? 'bg-emerald-500' : isShort ? 'bg-rose-500' : 'bg-gray-500'}`} />

      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 border border-gray-800`}>
                {isLong && <TrendingUp size={20} className="text-emerald-500" />}
                {isShort && <TrendingDown size={20} className="text-rose-500" />}
                {!isLong && !isShort && <Minus size={20} className="text-gray-500" />}
            </div>
            <div>
                <h4 className="text-lg font-bold text-white font-mono">{signal.asset}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border ${borderColor} ${bgColor} ${textColor}`}>
                    {signal.direction}
                </span>
            </div>
        </div>
        <div className="text-right">
            <div className="text-xs text-gray-500 uppercase">Confidence</div>
            <div className="text-xl font-mono font-bold text-indigo-400">{(signal.confidence * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-gray-300 text-sm leading-relaxed mb-2">
            {signal.rationaleShort}
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-gray-800/50 mt-3">
            <span className="text-xs text-gray-500 font-mono">Source: {signal.agentSource}</span>
            <span className="text-xs text-gray-500 font-mono">{new Date(signal.timestamp).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;