import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { PlatformDistribution } from '../types/dashboard'

interface Props {
  data: PlatformDistribution[]
}

const COLORS = ['#f59e0b', '#000000', '#ff2442', '#e6162d', '#ffa500', '#94a3b8']

export default function PlatformDistributionCard({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100/50">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">平台来源分布</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6 }} />
          <Legend
            iconType="circle"
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
