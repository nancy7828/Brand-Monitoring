import React from 'react';
import { Trophy, ArrowUpRight, ArrowDown } from 'lucide-react';
import RiskLevelBadge from './common/RiskLevelBadge';

interface RankingItem {
  rank: number;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  riskLevel: string;
}

interface Props {
  data: RankingItem[];
}

export default function RankingCard({ data }: Props) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-md shadow-yellow-200';
    if (rank === 2) return 'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-sm';
    if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-sm';
    return 'bg-slate-100 text-slate-500';
  };

  if (!data || !data.length) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h3 className="text-sm font-semibold text-slate-800">高风险排行</h3>
        <span className="ml-auto text-xs text-slate-400">TOP {data.length}</span>
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <div
            key={item.rank}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${getRankStyle(item.rank)}`}>
              {item.rank}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-sm font-medium text-slate-800 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>{item.value}{item.unit}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <RiskLevelBadge level={item.riskLevel as any} size="sm" />
              {item.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />}
              {item.trend === 'down' && <ArrowDown className="w-3.5 h-3.5 text-emerald-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
