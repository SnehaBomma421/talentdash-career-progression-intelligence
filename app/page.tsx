import { Suspense } from 'react'
import { getCareerData } from '@/career/careerService'
import { CareerDashboard } from '@/career/components/CareerDashboard'

export default async function HomePage() {
  const data = await getCareerData()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-td-black mb-2">
          Career Progression Intelligence
        </h1>
        <p className="text-td-body">
          Understand career growth beyond salaries — explore transition paths,
          promotion timelines, compensation trends, and skill progression
          across top Indian tech companies.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-td-surface border border-td-border rounded-lg p-6 animate-pulse"
              >
                <div className="h-4 bg-td-border rounded w-1/3 mb-3" />
                <div className="h-8 bg-td-border rounded w-1/2 mb-2" />
                <div className="h-3 bg-td-border rounded w-2/3" />
              </div>
            ))}
          </div>
        }
      >
        <CareerDashboard data={data} />
      </Suspense>
    </div>
  )
}
