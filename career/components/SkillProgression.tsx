import type { SkillData } from '../careerTypes'

interface SkillProgressionProps {
  skills: SkillData[]
}

export function SkillProgression({ skills }: SkillProgressionProps) {
  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 mb-4 rounded-full bg-td-border flex items-center justify-center">
          <svg className="w-8 h-8 text-td-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <p className="text-td-body text-center">No skill data available.</p>
      </div>
    )
  }

  const topSkills = skills.filter((s) => s.is_top)
  const emergingSkills = skills.filter((s) => s.is_emerging)
  const trending = [...skills].sort((a, b) => b.growth_pct - a.growth_pct).slice(0, 8)

  return (
    <div className="space-y-8">
      {/* Top skills */}
      <div className="bg-td-surface border border-td-border rounded-lg p-6">
        <h3 className="text-sm font-medium text-td-muted mb-4 uppercase tracking-wider">Top Skills</h3>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-td-bg border border-td-border rounded-lg px-3 py-2 flex items-center gap-2 hover:border-td-coral transition-colors"
            >
              <span className="text-sm font-medium text-td-black">{skill.name}</span>
              <span className="text-xs text-td-muted">{skill.growth_pct}% growth</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emerging skills */}
      <div className="bg-td-surface border border-td-border rounded-lg p-6">
        <h3 className="text-sm font-medium text-td-muted mb-4 uppercase tracking-wider">Emerging Skills</h3>
        <div className="flex flex-wrap gap-2">
          {emergingSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <span className="text-sm font-medium text-purple-800">{skill.name}</span>
              <span className="text-xs text-purple-600">+{skill.growth_pct}% YoY</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth trend */}
      <div className="bg-td-surface border border-td-border rounded-lg p-6">
        <h3 className="text-sm font-medium text-td-muted mb-4 uppercase tracking-wider">Highest Growth</h3>
        <div className="space-y-2">
          {trending.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between border-b border-td-border py-2.5 last:border-b-0 hover:bg-td-hover transition-colors px-2 -mx-2 rounded"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-medium text-td-black truncate">{skill.name}</span>
                {skill.is_top && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-td-coral/10 text-td-coral">Top</span>
                )}
                {skill.is_emerging && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-600">Emerging</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-td-muted shrink-0">
                <span className="text-td-green font-medium">+{skill.growth_pct}%</span>
                <div className="w-16 bg-td-border rounded-full h-1.5">
                  <div
                    className="bg-td-coral h-1.5 rounded-full transition-all"
                    style={{ width: `${skill.relevance_score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
