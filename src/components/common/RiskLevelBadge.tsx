import type { RiskLevel } from '../../types/dashboard'

const levelConfig: Record<RiskLevel, { label: string; bg: string; text: string; dot: string }> = {
  P0: { label: 'P0', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-600' },
  P1: { label: 'P1', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  P2: { label: 'P2', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  P3: { label: 'P3', bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
}

interface Props {
  level: RiskLevel
  size?: 'sm' | 'md'
}

export default function RiskLevelBadge({ level, size = 'md' }: Props) {
  const config = levelConfig[level]
  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {config.label}
      </span>
    )
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-semibold ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      {config.label}
      {level === 'P0' && ' 致命危机'}
      {level === 'P1' && ' 严重风险'}
      {level === 'P2' && ' 一般风险'}
      {level === 'P3' && ' 关注级'}
    </span>
  )
}
