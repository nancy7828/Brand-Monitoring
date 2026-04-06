import { AlertTriangle, MapPin, Package } from 'lucide-react'
import type { RiskEvent } from '../types/dashboard'
import RiskLevelBadge from './common/RiskLevelBadge'
import StatusBadge from './common/StatusBadge'

interface Props {
  events: RiskEvent[]
  onSelectEvent: (id: string) => void
}

export default function RiskEventListCard({ events, onSelectEvent }: Props) {
  const sortedEvents = [...events].sort((a, b) => {
    const order = { P0: 0, P1: 1, P2: 2, P3: 3 }
    return order[a.riskLevel] - order[b.riskLevel]
  })

  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          重点风险事件
        </h3>
        <span className="text-xs text-slate-400">共 {events.length} 个事件</span>
      </div>

      <div className="space-y-3">
        {sortedEvents.map((event) => (
          <div
            key={event.id}
            onClick={() => onSelectEvent(event.id)}
            className="p-4 rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <RiskLevelBadge level={event.riskLevel} size="sm" />
                <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h4>
              </div>
              <StatusBadge status={event.status} size="sm" />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2 ml-7">
              {event.targetStore && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {event.targetStore}
                </span>
              )}
              {event.targetProduct && (
                <span className="inline-flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {event.targetProduct}
                </span>
              )}
              <span>热度 {event.heatScore.toLocaleString()}</span>
              <span>{event.platforms.length} 个平台</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 ml-7">{event.summary}</p>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 ml-7">
              <span className="text-xs text-slate-400">负责人: {event.owner}</span>
              <span className="text-xs text-slate-400">更新于 {event.lastUpdated.split(' ')[1]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
