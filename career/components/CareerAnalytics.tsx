import type { CareerAnalyticsDimension } from '../careerTypes'

interface CareerAnalyticsProps {
  dimensions: CareerAnalyticsDimension[]
}

export function CareerAnalytics({ dimensions }: CareerAnalyticsProps) {
  if (dimensions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-td-border flex items-center justify-center">
          <svg className="w-8 h-8 text-td-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <p className="text-td-body text-center">No analytics data available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dimensions.map((dim, i) => (
        <div
          key={i}
          className="bg-td-surface border border-td-border rounded-lg p-5 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-td-muted">{dim.label}</p>
            {dim.direction && (
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                dim.direction === 'up' ? 'bg-green-50 text-td-green' : 'bg-red-50 text-td-error'
              }`}>
                {dim.direction === 'up' ? '↑' : '↓'}
              </span>
            )}
          </div>
          <p className="text-xl font-bold text-td-black">{dim.value}</p>
          {dim.sublabel && (
            <p className="text-xs text-td-muted mt-1">{dim.sublabel}</p>
          )}
          {dim.change_pct !== undefined && (
            <div className="mt-2">
              <span
                className={`text-xs font-medium ${
                  dim.change_pct >= 0 ? 'text-td-green' : 'text-td-error'
                }`}
              >
                {dim.change_pct >= 0 ? '+' : ''}{dim.change_pct}%
              </span>
              {dim.direction === 'down' && dim.label.includes('Years') && (
                <span className="text-xs text-td-muted ml-1">(faster promotions ↑)</span>
              )}
              {dim.direction === 'down' && dim.label.includes('Switch') && (
                <span className="text-xs text-td-muted ml-1">(better retention ↑)</span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
