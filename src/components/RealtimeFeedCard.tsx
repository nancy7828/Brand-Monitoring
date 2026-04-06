import { useState } from 'react'
import { Activity, MoreHorizontal } from 'lucide-react'
import type { FeedItem, Platform } from '../types/dashboard'
import RiskLevelBadge from './common/RiskLevelBadge'

const platformIcon: Record<Platform, string> = {
  weibo: '📱',
  douyin: '🎵',
  xiaohongshu: '📕',
  dianping: '⭐',
  meituan: '🛒',
  zhihu: '💬',
  bilibili: '📺',
  news: '📰',
  other: '🌐',
}

interface Props {
  feedItems: FeedItem[]
}

export default function RealtimeFeedCard({ feedItems }: Props) {
  const [items] = useState(feedItems.slice(0, 6))

  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          实时舆情流
        </h3>
        <span className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse-soft" />
          实时监测中
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/30 transition-all duration-150 cursor-pointer"
          >
            <span className="mt-0.5 text-lg">{platformIcon[item.platform]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs text-slate-400">{item.time}</span>
                <RiskLevelBadge level={item.riskLevel} size="sm" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">{item.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.keywords.map((kw) => (
                  <span key={kw} className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-medium">{kw}</span>
                ))}
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-slate-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  )
}
