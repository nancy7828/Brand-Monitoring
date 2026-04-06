import React from 'react';
import { X, Sparkles, AlertTriangle, TrendingUp, Globe, ArrowRight, CheckCircle2, Download, Clock } from 'lucide-react';
import type { AiBriefing } from '../types/dashboard';

interface Props {
  data: AiBriefing | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AiBriefingModal({ data, isOpen, onClose }: Props) {
  if (!data || !isOpen) return null;

  const getRiskLevel = (level: string) => {
    switch (level) {
      case 'P0': return 'bg-red-50 text-red-700 border-red-200';
      case 'P1': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'P2': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const totalMentions = data.platformSpread.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fade-in overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md shadow-violet-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">AI 风险简报</h2>
              <p className="text-xs text-slate-500">{data.date} · {data.brandName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/60 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="rounded-xl p-4 border bg-gradient-to-r from-red-50 via-orange-50 to-amber-50 border-orange-200/60">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0 text-orange-500" />
              <div>
                <h3 className="font-semibold text-sm text-slate-900 mb-1">今日风险摘要</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{data.executiveSummary}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> 重点事件 TOP{data.topEvents.length}
            </h3>
            <div className="space-y-2.5">
              {data.topEvents.map((evt) => (
                <div key={evt.rank} className="flex gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/80 transition-colors">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    evt.rank === 1 ? 'bg-red-100 text-red-600' :
                    evt.rank === 2 ? 'bg-orange-100 text-orange-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {evt.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{evt.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{evt.summary}</p>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-medium border ${getRiskLevel(evt.level)}`}>
                    {evt.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> 平台扩散情况
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {data.platformSpread.map((p) => (
                <div key={p.platform} className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs font-medium text-slate-700 min-w-[56px] truncate">{p.platform}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-slate-800 tabular-nums">{p.count.toLocaleString()}</span>
                      <span className="text-[10px] font-medium text-slate-400">{p.trend}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-violet-500 transition-all duration-500"
                        style={{ width: `${(p.count / totalMentions) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5" /> 建议动作
            </h3>
            <div className="space-y-2">
              {data.suggestedActions.map((action, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-violet-50 border border-violet-100">
                  <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">{action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                简报生成时间：{data.date}
              </span>
              <span>本简报由 AI 自动生成，仅供参考决策</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs text-slate-400">数据来源：多平台实时监测聚合</span>
          <button
            onClick={() => alert('演示功能：导出PDF')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            导出 PDF
          </button>
        </div>
      </div>
    </div>
  );
}
