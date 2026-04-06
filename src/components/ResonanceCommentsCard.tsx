import React from 'react';
import { MessageSquareQuote, Heart } from 'lucide-react';

interface ResonanceComment {
  id: string;
  platform: string;
  content: string;
  author: string;
  likes: number;
  time: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

interface Props {
  data: ResonanceComment[];
}

export default function ResonanceCommentsCard({ data }: Props) {
  const getSentimentColor = (s: string) => {
    switch (s) {
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'positive': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getSentimentLabel = (s: string) => {
    switch (s) {
      case 'negative': return '负面';
      case 'positive': return '正面';
      default: return '中性';
    }
  };

  const getPlatformColor = (p: string) => {
    switch (p) {
      case 'douyin': return 'bg-gray-800 text-white';
      case 'weibo': return 'bg-orange-500 text-white';
      case 'xiaohongshu': return 'bg-red-500 text-white';
      case 'dianping': return 'bg-green-600 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  if (!data || !data.length) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquareQuote className="w-5 h-5 text-indigo-500" />
        <h3 className="text-sm font-semibold text-slate-800">评论共振摘要</h3>
        <span className="ml-auto text-xs text-slate-400">共 {data.length} 条热点</span>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-lg border transition-colors hover:bg-slate-50 ${getSentimentColor(item.sentiment)}`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${getPlatformColor(item.platform)}`}>
                {item.platform === 'douyin' ? '抖音' :
                 item.platform === 'weibo' ? '微博' :
                 item.platform === 'xiaohongshu' ? '小红书' :
                 item.platform === 'dianping' ? '点评' : item.platform}
              </span>
              <span className="text-[11px] text-slate-500">{item.author}</span>
              <span className="ml-auto flex items-center gap-1 text-[11px] text-slate-400">
                <Heart className="w-3 h-3" /> {item.likes}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{item.content}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${getSentimentColor(item.sentiment)}`}>
                {getSentimentLabel(item.sentiment)}
              </span>
              <span className="text-[11px] text-slate-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
