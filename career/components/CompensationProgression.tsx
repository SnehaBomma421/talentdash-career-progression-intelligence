import { formatCurrency } from '@/lib/salary-utils'
import type { CompensationPoint } from '../careerTypes'

interface CompensationProgressionProps {
  data: CompensationPoint[]
}

export function CompensationProgression({ data }: CompensationProgressionProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-td-border flex items-center justify-center">
          <svg className="w-8 h-8 text-td-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-td-body text-center">No compensation data available.</p>
      </div>
    )
  }

  const maxTc = Math.max(...data.map((d) => d.avg_total_compensation))
  const barMaxHeight = 180

  return (
    <div className="bg-td-surface border border-td-border rounded-lg p-6">
      {/* Bar chart */}
      <div className="flex items-end gap-1 sm:gap-2 h-[200px] overflow-x-auto pb-2">
        {data.map((point) => {
          const height = maxTc > 0 ? (point.avg_total_compensation / maxTc) * barMaxHeight : 0
          return (
            <div
              key={point.experience_years}
              className="flex flex-col items-center flex-1 min-w-[32px] group"
            >
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-1 bg-td-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                {formatCurrency(point.avg_total_compensation, 'INR')}
              </div>
              {/* Bar */}
              <div
                className="w-full max-w-[40px] bg-td-coral rounded-t hover:opacity-80 transition-all cursor-pointer"
                style={{ height: `${Math.max(height, 4)}px` }}
                title={`${point.experience_years} yr${point.experience_years !== 1 ? 's' : ''}: ${formatCurrency(point.avg_total_compensation, 'INR')}`}
              />
              {/* Label */}
              <span className="text-[10px] text-td-muted mt-1">{point.experience_years}y</span>
            </div>
          )
        })}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {(() => {
          const start = data[0]
          const mid = data.find((d) => d.experience_years >= 4) || start
          const senior = data.find((d) => d.experience_years >= 7) || mid
          const peak = data[data.length - 1]
          return (
            <>
              <SummaryCard label="Entry (0–2 yrs)" value={formatCurrency(start.avg_total_compensation, 'INR')} />
              <SummaryCard label="Mid (3–5 yrs)" value={formatCurrency(mid.avg_total_compensation, 'INR')} />
              <SummaryCard label="Senior (6–8 yrs)" value={formatCurrency(senior.avg_total_compensation, 'INR')} />
              <SummaryCard label="Peak (8+ yrs)" value={formatCurrency(peak.avg_total_compensation, 'INR')} />
            </>
          )
        })()}
      </div>

      {/* Attribution */}
      <p className="text-xs text-td-muted mt-4 text-center">
        Based on {data.reduce((s, d) => s + d.record_count, 0)} salary records &middot;
        Bars show average total compensation per experience year
      </p>
    </div>
  )
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-td-bg border border-td-border rounded-lg p-3 text-center">
      <p className="text-xs text-td-muted">{label}</p>
      <p className="text-sm font-bold text-td-black mt-0.5">{value}</p>
    </div>
  )
}
