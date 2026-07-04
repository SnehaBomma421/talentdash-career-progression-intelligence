import { Badge } from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/salary-utils'
import type { PromotionStep } from '../careerTypes'

interface PromotionTimelineProps {
  timeline: PromotionStep[]
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5 text-td-coral mx-auto my-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

export function PromotionTimeline({ timeline }: PromotionTimelineProps) {
  if (timeline.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-td-border flex items-center justify-center">
          <svg className="w-8 h-8 text-td-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <p className="text-td-body text-center">No promotion data available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-0">
      {timeline.map((step, i) => (
        <div key={step.level}>
          {/* Card */}
          <div className="bg-td-surface border border-td-border rounded-lg p-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <Badge level={step.level} />
                <span className="text-base font-semibold text-td-black">{step.level_label}</span>
              </div>
              {step.salary_growth_pct > 0 && i > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-td-green">
                  +{step.salary_growth_pct}% from previous
                </span>
              )}
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-td-muted">Avg Total Comp</p>
                <p className="text-lg font-bold text-td-black">
                  {formatCurrency(step.avg_total_compensation, 'INR')}
                </p>
              </div>
              <div>
                <p className="text-xs text-td-muted">Avg Base</p>
                <p className="text-sm font-semibold text-td-body">{formatCurrency(step.avg_base_salary, 'INR')}</p>
              </div>
              <div>
                <p className="text-xs text-td-muted">Median Duration</p>
                <p className="text-sm font-semibold text-td-body">~{step.avg_duration_years} yr{step.avg_duration_years !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-xs text-td-muted">Salary Growth</p>
                <p className="text-sm font-semibold text-td-green">
                  {step.salary_growth_pct > 0 ? `+${step.salary_growth_pct}%` : '—'}
                </p>
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {step.required_skills.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-td-muted mb-1.5 uppercase tracking-wider">Key Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-td-bg text-td-body"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {step.certifications.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-td-muted mb-1.5 uppercase tracking-wider">Certifications</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-td-blue"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Arrow connector */}
          {i < timeline.length - 1 && <ArrowIcon />}
        </div>
      ))}
    </div>
  )
}
