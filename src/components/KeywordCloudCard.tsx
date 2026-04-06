import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { KeywordItem } from '../types/dashboard'
import RiskLevelBadge from './common/RiskLevelBadge'

interface Props {
  keywords: KeywordItem[]
}

export default function KeywordCloudCard({ keywords }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100/50">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">高频风险关键词</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw) => (
          <span
            key={kw.word}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all duration-150 cursor-default"
            style={{
              borderColor: kw.level === 'P0' ? '#fecaca' : kw.level === 'P1' ? '#fed7aa' : kw.level === 'P2' ? '#fef08a' : '#e2e8f0',
              backgroundColor: kw.level === 'P0' ? '#fef2f2' : kw.level === 'P1' ? '#fff7ed' : kw.level === 'P2' ? '#fffbeb' : 'white',
              color: kw.level === 'P0' ? '#dc2626' : kw.level === 'P1' ? '#ea580c' : kw.level === 'P2' ? '#d97706' : '#475569',
            }}
          >
            {kw.word}
            <span className="text-xs opacity-70">{kw.count}</span>
            {kw.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-500" />}
            {kw.trend === 'down' && <TrendingDown className="w-3 h-3 text-emerald-500" />}
            {kw.trend === 'stable' && <Minus className="w-3 h-3 text-slate-400" />}
          </span>
        ))}
      </div>
    </div>
  )
}
