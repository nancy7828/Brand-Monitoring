import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { RiskTypeItem } from '../types/dashboard'

interface Props {
  data: RiskTypeItem[]
}

const COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#6b7280']

export default function RiskTypeDistributionCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100/50">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">风险类型分布</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} stroke="#94a3b8" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 6 }}
            formatter={(value: number) => [`${value}%`, '占比']}
          />
          <Bar dataKey="value" radius={[4, 4, 2, 2]} barSize={24}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} rx={4} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
