import type { CareerOutcomeData } from '../careerTypes'

interface CareerOutcomesProps {
  outcomes: CareerOutcomeData[]
}

export function CareerOutcomes({ outcomes }: CareerOutcomesProps) {
  if (outcomes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-td-border flex items-center justify-center">
          <svg className="w-8 h-8 text-td-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <p className="text-td-body text-center">No outcome data available.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {outcomes.map((outcome, i) => (
        <div
          key={`${outcome.type}-${i}`}
          className="bg-td-surface border border-td-border rounded-lg p-5 hover:border-td-coral hover:shadow-sm transition-all"
        >
          <p className="text-xs text-td-muted mb-1">{outcome.label}</p>
          <p className="text-xl font-bold text-td-black mb-1">{outcome.value}</p>
          {outcome.sublabel && (
            <p className="text-xs text-td-muted">{outcome.sublabel}</p>
          )}
          {outcome.trend_pct !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`inline-flex items-center text-xs font-medium ${
                  outcome.trend_pct >= 0 ? 'text-td-green' : 'text-td-error'
                }`}
              >
                {outcome.trend_pct >= 0 ? (
                  <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {Math.abs(outcome.trend_pct)}%
              </span>
              <span className="text-xs text-td-muted">vs last year</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
