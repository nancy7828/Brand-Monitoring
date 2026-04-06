import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { TrendDataPoint } from '../types/dashboard'

interface Props {
  data: TrendDataPoint[]
}

export default function TrendChartCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100/50">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">风险趋势（近7日）</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
            }}
          />
          <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="total" name="舆情总量" stroke="#64748b" strokeWidth={2.5} dot={{ r: 4, fill: '#64748b' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="highRisk" name="中高风险量" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
