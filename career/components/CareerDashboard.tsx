'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { CareerData } from '../careerTypes'
import { CareerTransitions } from './CareerTransitions'
import { PromotionTimeline } from './PromotionTimeline'
import { CompensationProgression } from './CompensationProgression'
import { SkillProgression } from './SkillProgression'
import { CareerOutcomes } from './CareerOutcomes'
import { CareerAnalytics } from './CareerAnalytics'

interface CareerDashboardProps {
  data: CareerData
}

type TabId = 'outcomes' | 'transitions' | 'promotion' | 'compensation' | 'skills' | 'analytics'

const TABS: { id: TabId; label: string }[] = [
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'transitions', label: 'Transitions' },
  { id: 'promotion', label: 'Promotion' },
  { id: 'compensation', label: 'Compensation' },
  { id: 'skills', label: 'Skills' },
  { id: 'analytics', label: 'Analytics' },
]

export function CareerDashboard({ data }: CareerDashboardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab: TabId = (searchParams.get('tab') as TabId) || 'outcomes'
  const { data: insights } = data

  const setTab = (tab: TabId) => {
    const sp = new URLSearchParams(searchParams.toString())
    sp.set('tab', tab)
    router.push(`?${sp.toString()}`, { scroll: false })
  }

  return (
    <div>
      {/* ── Tab bar ────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-td-border pb-4">
        {TABS.map((t) => {
          const isActive = activeTab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-td-coral text-white'
                  : 'bg-td-surface text-td-body border border-td-border hover:bg-td-hover'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* ── Tab panels ─────────────────────────────── */}
      <div className="min-h-[300px]">
        {activeTab === 'outcomes' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-td-black">Career Outcomes</h2>
              <p className="text-td-body mt-1">Key metrics that shape tech careers in India.</p>
            </div>
            <CareerOutcomes outcomes={insights.careerOutcomes} />
          </section>
        )}

        {activeTab === 'transitions' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-td-black">Career Transition Explorer</h2>
              <p className="text-td-body mt-1">
                Common career moves between companies — including average tenure before switching and salary impact.
              </p>
            </div>
            <CareerTransitions transitions={insights.transitions} />
          </section>
        )}

        {activeTab === 'promotion' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-td-black">Promotion Timeline</h2>
              <p className="text-td-body mt-1">
                Compensation, skills, and certifications required at each career level.
              </p>
            </div>
            <PromotionTimeline timeline={insights.promotionTimeline} />
          </section>
        )}

        {activeTab === 'compensation' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-td-black">Compensation Progression</h2>
              <p className="text-td-body mt-1">
                How total compensation grows with experience across Indian tech companies.
              </p>
            </div>
            <CompensationProgression data={insights.compensationProgression} />
          </section>
        )}

        {activeTab === 'skills' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-td-black">Skill Progression</h2>
              <p className="text-td-body mt-1">
                Top and emerging skills that drive career growth.
              </p>
            </div>
            <SkillProgression skills={insights.skillProgression} />
          </section>
        )}

        {activeTab === 'analytics' && (
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-td-black">Career Analytics</h2>
              <p className="text-td-body mt-1">
                Data-driven dimensions that define career trajectories in tech.
              </p>
            </div>
            <CareerAnalytics dimensions={insights.analytics} />
          </section>
        )}
      </div>
    </div>
  )
}
