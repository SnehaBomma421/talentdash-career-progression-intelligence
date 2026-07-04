/**
 * Career Progression Intelligence — Type Definitions
 *
 * All types used by the Career module. No component stores hardcoded data.
 * These types mirror the existing TalentDash naming conventions.
 */

import type { LevelEnum } from '@/types'

/** A single career transition between two companies */
export interface CareerTransition {
  from_company: string
  to_company: string
  from_company_slug: string
  to_company_slug: string
  from_role: string
  to_role: string
  transition_frequency: number
  avg_years_before_switch: number
  avg_salary_increase_pct: number
  common_skills: string[]
}

/** A single rung on the promotion ladder */
export interface PromotionStep {
  level: LevelEnum
  level_label: string
  avg_duration_years: number
  avg_base_salary: number
  avg_total_compensation: number
  salary_growth_pct: number
  required_skills: string[]
  certifications: string[]
}

/** A single data point in the compensation-progression curve */
export interface CompensationPoint {
  experience_years: number
  avg_total_compensation: number
  avg_base_salary: number
  avg_bonus: number
  avg_stock: number
  record_count: number
}

/** A single skill entry */
export interface SkillData {
  name: string
  category: 'TECHNOLOGY' | 'CERTIFICATION' | 'LANGUAGE' | 'FRAMEWORK' | 'PLATFORM'
  growth_pct: number
  is_emerging: boolean
  is_top: boolean
  relevance_score: number
}

/** A single career-outcome stat card */
export interface CareerOutcomeData {
  type: 'NEXT_COMPANY' | 'NEXT_ROLE' | 'AVG_SALARY' | 'SUCCESS_METRIC'
  label: string
  value: string
  sublabel?: string
  trend_pct?: number
}

/** Analytics dimension */
export interface CareerAnalyticsDimension {
  label: string
  value: string | number
  sublabel?: string
  change_pct?: number
  direction?: 'up' | 'down' | 'neutral'
}

/** Full dataset passed from the service to the dashboard */
export interface CareerInsightsData {
  transitions: CareerTransition[]
  promotionTimeline: PromotionStep[]
  compensationProgression: CompensationPoint[]
  skillProgression: SkillData[]
  careerOutcomes: CareerOutcomeData[]
  analytics: CareerAnalyticsDimension[]
}

/** Optional filters that the service layer accepts */
export interface CareerFilters {
  company?: string
  role?: string
  experience?: string
  industry?: string
}

/** Singleton return shape */
export interface CareerData {
  data: CareerInsightsData
  filters: CareerFilters
}
