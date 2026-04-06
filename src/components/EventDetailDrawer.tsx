import React from 'react';
import { X, Clock, MapPin, Package, User, FileText, MessageSquare, BarChart3, Sparkles, ClipboardList, ArrowUpRight, AlertTriangle, CheckCircle2, Eye, Send, Archive } from 'lucide-react';
import RiskLevelBadge from './common/RiskLevelBadge';
import StatusBadge from './common/StatusBadge';
import type { EventDetail } from '../types/dashboard';

interface Props {
  event: EventDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailDrawer({ event, isOpen, onClose }: Props) {
  if (!event || !isOpen) return null;

  const platformIconMap: Record<string, string> = {
    '抖音': '抖', '微博': '微', '小红书': '红', '大众点评': '评',
    '美团': '美', 'B站': 'B', '知乎': '知', '其他': '?',
  };

  const platformColorMap: Record<string, string> = {
    '抖音': 'bg-gray-800', '微博': 'bg-orange-500', '小红书': 'bg-red-500',
    '大众点评': 'bg-green-600', '美团': 'bg-yellow-500', 'B站': 'bg-blue-500',
    '知乎': 'bg-cyan-600', '其他': 'bg-slate-400',
  };

  const typeLabelMap: Record<string, { label: string; color: string }> = {
    detect: { label: '检测', color: 'bg-blue-100 text-blue-700' },
    alert: { label: '预警', color: 'bg-red-100 text-red-700' },
    respond: { label: '响应', color: 'bg-violet-100 text-violet-700' },
    update: { label: '更新', color: 'bg-amber-100 text-amber-700' },
    resolve: { label: '解决', color: 'bg-emerald-100 text-emerald-700' },
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl h-full bg-white shadow-2xl animate-slide-in-right overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight line-clamp-2">{event.title}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <RiskLevelBadge level={event.riskLevel} />
              <StatusBadge status={event.status} />
              <span className="text-xs text-slate-400">ID: {event.eventId}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
              <Package className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-slate-400">涉及品牌</p>
                <p className="text-xs font-medium text-slate-700 truncate">{event.brandName}</p>
              </div>
            </div>
            {event.storeName && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400">涉及门店</p>
                  <p className="text-xs font-medium text-slate-700 truncate">{event.storeName}</p>
                </div>
              </div>
            )}
            {event.productName && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
                <Package className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400">涉及产品</p>
                  <p className="text-xs font-medium text-slate-700 truncate">{event.productName}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50">
              <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-slate-400">首次发现</p>
                <p className="text-xs font-medium text-slate-700 truncate">{event.firstDetected}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400">当前责任人</p>
              <p className="text-xs font-medium text-slate-700">{event.owner || '未指派'}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> 事件摘要
            </h3>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{event.summary}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> 处置时间线
            </h3>
            <div className="space-y-3">
              {event.timeline.map((entry, i) => {
                const typeStyle = typeLabelMap[entry.type] || { label: entry.type, color: 'bg-slate-100 text-slate-600' };
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0 ${typeStyle.color.replace('text-', 'bg-').replace('-100', '-500').replace('-700', '-600')}`}>
                        {typeStyle.label[0]}
                      </div>
                      {i < event.timeline.length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${typeStyle.color}`}>
                          {typeStyle.label}
                        </span>
                        <span className="text-[11px] text-slate-400">{entry.time}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{entry.event}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" /> 平台来源分布
            </h3>
            <div className="space-y-2.5">
              {event.platformDistribution.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-16 shrink-0">{p.name}</span>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${p.value}%`, backgroundColor: p.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600 w-10 text-right tabular-nums">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> 评论共振摘要
            </h3>
            <div className="p-4 rounded-lg bg-violet-50 border border-violet-100">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{event.resonanceSummary}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-500" /> AI 处理建议
            </h3>
            <div className="p-4 rounded-lg bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100">
              <pre className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">{event.aiSuggestion}</pre>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5" /> 状态流转记录
            </h3>
            <div className="space-y-2">
              {event.statusLog.map((log, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                  <span className="text-[11px] text-slate-400 w-24 shrink-0">{log.time}</span>
                  <span className="text-xs text-slate-600 flex-1">{log.action}</span>
                  <span className="text-[11px] text-slate-400 shrink-0">{log.operator}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">操作</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Send, label: '指派处理', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200' },
                { icon: ArrowUpRight, label: '升级风险', color: 'bg-red-50 text-red-700 hover:bg-red-100 border-red-200' },
                { icon: Eye, label: '标记已核查', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200' },
                { icon: Archive, label: '关闭事件', color: 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300' },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => alert(`演示功能：${btn.label}`)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${btn.color}`}
                >
                  <btn.icon className="w-3.5 h-3.5" />
                  {btn.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => alert('演示功能：生成危机简报')}
              className="w-full mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 transition-colors shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              生成危机简报
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
