import { TrendingUp, TrendingDown, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'
import type { SummaryMetrics } from '../types/dashboard'

interface Props {
  metrics: SummaryMetrics
}

const cards = [
  {
    key: 'newMentionsToday' as const,
    label: '今日新增舆情',
    icon: TrendingUp,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    key: 'highRiskEvents' as const,
    label: '中高风险事件',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    key: 'pendingEvents' as const,
    label: '待处理事件',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    key: 'closedRate' as const,
    label: '闭环率',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
]

export default function SummaryCards({ metrics }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => {
        const value = metrics[card.key]
        const trend = metrics[`${card.key}Trend` as keyof SummaryMetrics] as number
        const isPositive = card.key === 'closedRate' ? trend >= 0 : trend <= 0
        const displayValue = typeof value === 'number' ? value.toLocaleString() : value

        return (
          <div key={card.key} className="bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-slate-100/50">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-slate-500 font-medium">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">{displayValue}</span>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(trend)}%
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
