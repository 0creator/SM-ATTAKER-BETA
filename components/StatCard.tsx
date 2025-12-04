import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change?: number; // percentage
  subtext?: string;
  positiveIsGood?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  change, 
  subtext,
  positiveIsGood = true 
}) => {
  const isPositive = change !== undefined && change >= 0;
  const isGood = positiveIsGood ? isPositive : !isPositive;
  
  const changeColor = isGood ? 'text-emerald-400' : 'text-rose-400';
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">{label}</h3>
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold text-white font-mono">{value}</span>
        {change !== undefined && (
          <div className={`flex items-center text-sm font-medium ${changeColor}`}>
            <Icon size={14} className="mr-0.5" />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      {subtext && (
        <p className="text-gray-500 text-xs mt-2 font-mono">{subtext}</p>
      )}
    </div>
  );
};

export default StatCard;