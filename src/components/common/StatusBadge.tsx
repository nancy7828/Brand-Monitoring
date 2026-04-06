import type { EventStatus } from '../../types/dashboard'

const statusConfig: Record<EventStatus, { bg: string; text: string; dot: string }> = {
  '待研判': { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  '已告警': { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  '处理中': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  '已关闭': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
}

interface Props {
  status: EventStatus
  size?: 'sm' | 'md'
}

export default function StatusBadge({ status, size = 'md' }: Props) {
  const config = statusConfig[status]
  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {status}
      </span>
    )
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-medium ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {status}
    </span>
  )
}
