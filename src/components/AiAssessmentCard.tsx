import React from 'react';
import { Brain, AlertCircle, CheckCircle2, Lightbulb, ArrowRight } from 'lucide-react';

interface AiAssessment {
  overallRisk: string;
  riskScore: number;
  keyFindings: string[];
  suggestedActions: string[];
  nextWatch: string[];
}

interface Props {
  data: AiAssessment;
}

export default function AiAssessmentCard({ data }: Props) {
  if (!data) return null;

  const getOverallRiskColor = (risk: string) => {
    if (risk.includes('高') || risk.includes('严重')) return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: AlertCircle };
    if (risk.includes('中')) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: AlertCircle };
    return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: CheckCircle2 };
  };

  const riskStyle = getOverallRiskColor(data.overallRisk);
  const RiskIcon = riskStyle.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-violet-500" />
        <h3 className="text-sm font-semibold text-slate-800">AI 风险研判摘要</h3>
      </div>

      <div className={`rounded-lg border p-3.5 mb-4 ${riskStyle.bg} ${riskStyle.border}`}>
        <div className="flex items-center gap-2 mb-1">
          <RiskIcon className={`w-4 h-4 ${riskStyle.text}`} />
          <span className={`text-sm font-semibold ${riskStyle.text}`}>综合风险评级</span>
          <span className="ml-auto text-xs text-slate-500">风险分 {data.riskScore}</span>
        </div>
        <p className={`text-xs ${riskStyle.text} opacity-80`}>
          基于当前舆情态势，系统综合评估为「{data.overallRisk}」状态，
          建议{data.suggestedActions?.[0] || '持续关注'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> 关键发现
          </h4>
          <ul className="space-y-1.5">
            {data.keyFindings?.map((finding, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                {finding}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5" /> AI 处理建议
          </h4>
          <ul className="space-y-1.5">
            {data.suggestedActions?.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        {data.prediction && (
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" /> 趋势预测
            </h4>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed">{data.prediction}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
