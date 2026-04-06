import { AlertCircle, FileText, ChevronDown } from 'lucide-react'
import type { ScenarioType } from '../types/dashboard'

interface Props {
  activeScenario: ScenarioType
  onScenarioChange: (s: ScenarioType) => void
  onOpenBriefing: () => void
}

const scenarios: { key: ScenarioType; label: string }[] = [
  { key: 'chain', label: '连锁品牌' },
  { key: 'beverage', label: '新消费饮品' },
  { key: 'packaged_food', label: '包装食品' },
]

export default function TopNav({ activeScenario, onScenarioChange, onOpenBriefing }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-sm backdrop-blur-sm">
      <div className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
              舆
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900 leading-tight">餐饮与食品消费品牌</h1>
              <p className="text-xs text-slate-500 leading-tight -mt-0.5">实时舆情预警指挥台</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-slate-100/80 rounded-lg p-1">
          {scenarios.map((s) => (
            <button
              key={s.key}
              onClick={() => onScenarioChange(s.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeScenario === s.key
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm cursor-pointer hover:border-slate-300 transition-colors">
            <span className="text-slate-600">时间范围</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            onClick={onOpenBriefing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            生成 AI 风险简报
          </button>

          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
            <AlertCircle className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
