import type { CareerTransition } from '../careerTypes'

interface CareerTransitionsProps {
  transitions: CareerTransition[]
}

export function CareerTransitions({ transitions }: CareerTransitionsProps) {
  if (transitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-td-border flex items-center justify-center">
          <svg className="w-8 h-8 text-td-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
        <p className="text-td-body text-center mb-4">No transition data matches your filters.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-td-border">
            <th className="text-left py-3 px-4 text-xs font-medium text-td-muted uppercase tracking-wider">From</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-td-muted uppercase tracking-wider">To</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-td-muted uppercase tracking-wider">Role Path</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-td-muted uppercase tracking-wider">Frequency</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-td-muted uppercase tracking-wider">Avg Time</th>
            <th className="text-right py-3 px-4 text-xs font-medium text-td-muted uppercase tracking-wider">Avg Increase</th>
          </tr>
        </thead>
        <tbody>
          {transitions.map((t, i) => (
            <tr
              key={i}
              className="border-b border-td-border hover:bg-td-hover transition-colors"
            >
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-td-black">{t.from_company}</span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm font-medium text-td-black flex items-center gap-1">
                  <svg className="w-4 h-4 text-td-coral shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {t.to_company}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-td-body truncate max-w-[200px] block" title={`${t.from_role} → ${t.to_role}`}>
                  {t.from_role} → {t.to_role}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm text-td-body">{t.transition_frequency}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm text-td-body">~{t.avg_years_before_switch} yr{t.avg_years_before_switch !== 1 ? 's' : ''}</span>
              </td>
              <td className="py-3 px-4 text-right">
                <span className="text-sm font-medium text-td-green">+{t.avg_salary_increase_pct}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Skills breakdown footer */}
      <div className="mt-6 space-y-3">
        {transitions.map((t, i) => (
          <div key={`skills-${i}`} className="bg-td-surface border border-td-border rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-td-muted mb-2">
              <span className="text-sm font-medium text-td-black">{t.from_company}</span>
              <svg className="w-3 h-3 text-td-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="text-sm font-medium text-td-black">{t.to_company}</span>
              <span className="text-td-border mx-1">·</span>
              <span>Common skills acquired</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.common_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-td-bg text-td-body"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
