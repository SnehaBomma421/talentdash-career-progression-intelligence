/**
 * Career Progression Intelligence — Data Service
 *
 * THE ONLY SOURCE OF TRUTH for career data.
 * No component contains hardcoded values.
 *
 * ── Contract ─────────────────────────────────────────────────────────
 * getCareerData(filters?): CareerData
 *
 * Currently returns typed mock data.
 * Later, replace the internals with Prisma queries / API calls.
 * The interface (what each component imports) stays identical.
 */

import type { LevelEnum } from '@/types'
import { LEVELS } from '@/lib/constants'
import type {
  CareerTransition,
  PromotionStep,
  CompensationPoint,
  SkillData,
  CareerOutcomeData,
  CareerAnalyticsDimension,
  CareerFilters,
  CareerData,
} from './careerTypes'

// ═══════════════════════════════════════════════════════════════════════
//  MOCK DATA — swap these functions when a real data source is ready
// ═══════════════════════════════════════════════════════════════════════

const EMPLOYER_SIZE: Record<string, string> = {
  google: '10,000+',
  amazon: '10,000+',
  microsoft: '10,000+',
  meta: '10,000+',
  flipkart: '10,000+',
  tcs: '100,000+',
  infosys: '100,000+',
  wipro: '100,000+',
  razorpay: '1,000–10,000',
  zepto: '1,000–10,000',
  meesho: '1,000–10,000',
  nvidia: '10,000+',
}

// ── 1. Career Transitions ──────────────────────────────────────────

function mockTransitions(): CareerTransition[] {
  return [
    { from_company: 'TCS', to_company: 'Amazon', from_company_slug: 'tcs', to_company_slug: 'amazon', from_role: 'Software Engineer', to_role: 'SDE', transition_frequency: 45, avg_years_before_switch: 3.2, avg_salary_increase_pct: 180, common_skills: ['Java', 'SQL', 'Spring Boot', 'AWS'] },
    { from_company: 'TCS', to_company: 'Microsoft', from_company_slug: 'tcs', to_company_slug: 'microsoft', from_role: 'Software Engineer', to_role: 'Software Engineer', transition_frequency: 38, avg_years_before_switch: 3.8, avg_salary_increase_pct: 150, common_skills: ['C#', '.NET', 'Azure', 'SQL Server'] },
    { from_company: 'Infosys', to_company: 'Google India', from_company_slug: 'infosys', to_company_slug: 'google', from_role: 'Technology Lead', to_role: 'Software Engineer', transition_frequency: 32, avg_years_before_switch: 4.1, avg_salary_increase_pct: 200, common_skills: ['Python', 'Data Structures', 'Algorithms', 'System Design'] },
    { from_company: 'Infosys', to_company: 'Microsoft', from_company_slug: 'infosys', to_company_slug: 'microsoft', from_role: 'Software Engineer', to_role: 'Software Engineer', transition_frequency: 40, avg_years_before_switch: 3.5, avg_salary_increase_pct: 160, common_skills: ['Java', 'Azure', 'Microservices', 'DevOps'] },
    { from_company: 'Wipro', to_company: 'Flipkart', from_company_slug: 'wipro', to_company_slug: 'flipkart', from_role: 'Software Engineer', to_role: 'SDE', transition_frequency: 25, avg_years_before_switch: 3.0, avg_salary_increase_pct: 140, common_skills: ['Java', 'Spring Boot', 'Kafka', 'Redis'] },
    { from_company: 'Wipro', to_company: 'Meta', from_company_slug: 'wipro', to_company_slug: 'meta', from_role: 'Project Manager', to_role: 'Software Engineer', transition_frequency: 18, avg_years_before_switch: 4.5, avg_salary_increase_pct: 250, common_skills: ['React', 'Python', 'System Design', 'C++'] },
    { from_company: 'Amazon', to_company: 'Flipkart', from_company_slug: 'amazon', to_company_slug: 'flipkart', from_role: 'SDE', to_role: 'SDE', transition_frequency: 22, avg_years_before_switch: 2.8, avg_salary_increase_pct: 25, common_skills: ['Java', 'Distributed Systems', 'System Design', 'AWS'] },
    { from_company: 'TCS', to_company: 'Razorpay', from_company_slug: 'tcs', to_company_slug: 'razorpay', from_role: 'Software Engineer', to_role: 'Software Engineer', transition_frequency: 20, avg_years_before_switch: 2.5, avg_salary_increase_pct: 120, common_skills: ['Python', 'Django', 'AWS', 'PostgreSQL'] },
    { from_company: 'Infosys', to_company: 'NVIDIA', from_company_slug: 'infosys', to_company_slug: 'nvidia', from_role: 'Technology Lead', to_role: 'Deep Learning Engineer', transition_frequency: 15, avg_years_before_switch: 5.0, avg_salary_increase_pct: 220, common_skills: ['C++', 'CUDA', 'Python', 'Machine Learning'] },
    { from_company: 'Microsoft', to_company: 'Google India', from_company_slug: 'microsoft', to_company_slug: 'google', from_role: 'Software Engineer', to_role: 'Software Engineer', transition_frequency: 28, avg_years_before_switch: 3.0, avg_salary_increase_pct: 35, common_skills: ['System Design', 'Distributed Systems', 'C++', 'Python'] },
    { from_company: 'Flipkart', to_company: 'Zepto', from_company_slug: 'flipkart', to_company_slug: 'zepto', from_role: 'SDE', to_role: 'Software Engineer', transition_frequency: 16, avg_years_before_switch: 2.2, avg_salary_increase_pct: 20, common_skills: ['React', 'Node.js', 'MongoDB', 'AWS'] },
  ]
}

// ── 2. Promotion Timeline ──────────────────────────────────────────

const PROMOTION_LABELS: Record<string, string> = {
  L3: 'Software Engineer',
  L4: 'Senior Software Engineer',
  L5: 'Staff Software Engineer',
  L6: 'Senior Staff Engineer',
  SDE_I: 'SDE I',
  SDE_II: 'SDE II',
  SDE_III: 'SDE III',
  STAFF: 'Staff Engineer',
  PRINCIPAL: 'Principal Engineer',
  IC4: 'IC4',
  IC5: 'IC5',
}

const LEVEL_SKILLS: Record<string, string[]> = {
  L3: ['Core Data Structures', 'Java / Python', 'Basic SQL', 'Git'],
  L4: ['Algorithms & Problem Solving', 'System Design Basics', 'Testing', 'Agile'],
  L5: ['Advanced System Design', 'Cross-team Collaboration', 'Performance', 'Mentoring'],
  L6: ['Architectural Design', 'Strategic Planning', 'Org-wide Influence', 'Hiring'],
  SDE_I: ['Core Programming', 'Data Structures', 'Basic Algorithms', 'Code Reviews'],
  SDE_II: ['Distributed Systems', 'Database Design', 'API Design', 'Project Planning'],
  SDE_III: ['Complex System Design', 'Technical Leadership', 'Cross-org Communication', 'Production Excellence'],
  STAFF: ['Strategic Direction', 'Org-wide Architecture', 'Mentoring Seniors', 'Cross-org Influence'],
  PRINCIPAL: ['Industry-wide Vision', 'Company Strategy', 'Executive Communication', 'Innovation'],
  IC4: ['Full-stack Development', 'System Design', 'Code Quality', 'Cross-team Collaboration'],
  IC5: ['Large-scale System Design', 'Technical Strategy', 'Org-wide Impact', 'Mentoring IC4s'],
}

const LEVEL_CERTS: Record<string, string[]> = {
  L3: ['AWS Certified Cloud Practitioner', 'Google Cloud Digital Leader'],
  L4: ['AWS Solutions Architect Associate', 'CKA'],
  L5: ['AWS Solutions Architect Professional', 'Google Professional Cloud Architect'],
  L6: ['TOGAF Certified', 'AWS DevOps Engineer Professional'],
  SDE_I: ['AWS Certified Cloud Practitioner', 'Oracle Java SE Programmer'],
  SDE_II: ['AWS Solutions Architect Associate', 'Azure Developer Associate'],
  SDE_III: ['AWS Solutions Architect Professional', 'Google Professional Cloud Architect'],
  STAFF: ['TOGAF', 'AWS Certified Advanced Networking'],
  PRINCIPAL: ['Executive Leadership Program'],
  IC4: ['AWS Solutions Architect Associate', 'Google Cloud Associate'],
  IC5: ['AWS Solutions Architect Professional', 'Google Professional Cloud Architect', 'CNCF Certification'],
}

function mockPromotionTimeline(): PromotionStep[] {
  // Synthetic per-level compensation data that mirrors real TalentDash salary ranges
  const LEVEL_TC: Record<string, { tc: number; base: number; exp: number }> = {
    L3: { tc: 3500000, base: 2800000, exp: 2 },
    L4: { tc: 5200000, base: 4200000, exp: 5 },
    L5: { tc: 8500000, base: 6500000, exp: 8 },
    L6: { tc: 13000000, base: 10000000, exp: 12 },
    SDE_I: { tc: 2200000, base: 1800000, exp: 1 },
    SDE_II: { tc: 3800000, base: 3000000, exp: 3 },
    SDE_III: { tc: 6500000, base: 5000000, exp: 7 },
    STAFF: { tc: 11000000, base: 8500000, exp: 11 },
    PRINCIPAL: { tc: 20000000, base: 15000000, exp: 16 },
    IC4: { tc: 5000000, base: 4000000, exp: 4 },
    IC5: { tc: 9000000, base: 7000000, exp: 9 },
  }

  const timeline: PromotionStep[] = []
  let prevTc: number | null = null

  for (const level of LEVELS) {
    const data = LEVEL_TC[level]
    if (!data) continue

    const growth = prevTc !== null ? Math.round(((data.tc - prevTc) / prevTc) * 100) : 0

    timeline.push({
      level: level as LevelEnum,
      level_label: PROMOTION_LABELS[level] || level,
      avg_duration_years: data.exp,
      avg_base_salary: data.base,
      avg_total_compensation: data.tc,
      salary_growth_pct: growth,
      required_skills: LEVEL_SKILLS[level] || ['Communication', 'Problem Solving'],
      certifications: LEVEL_CERTS[level] || [],
    })

    prevTc = data.tc
  }

  return timeline
}

// ── 3. Compensation Progression ────────────────────────────────────

function mockCompensationProgression(): CompensationPoint[] {
  return [
    { experience_years: 0, avg_total_compensation: 1800000, avg_base_salary: 1600000, avg_bonus: 100000, avg_stock: 100000, record_count: 12 },
    { experience_years: 1, avg_total_compensation: 2200000, avg_base_salary: 1800000, avg_bonus: 200000, avg_stock: 200000, record_count: 18 },
    { experience_years: 2, avg_total_compensation: 2800000, avg_base_salary: 2200000, avg_bonus: 300000, avg_stock: 300000, record_count: 25 },
    { experience_years: 3, avg_total_compensation: 3500000, avg_base_salary: 2600000, avg_bonus: 400000, avg_stock: 500000, record_count: 30 },
    { experience_years: 4, avg_total_compensation: 4500000, avg_base_salary: 3200000, avg_bonus: 500000, avg_stock: 800000, record_count: 28 },
    { experience_years: 5, avg_total_compensation: 5800000, avg_base_salary: 4000000, avg_bonus: 700000, avg_stock: 1100000, record_count: 24 },
    { experience_years: 6, avg_total_compensation: 7200000, avg_base_salary: 4800000, avg_bonus: 900000, avg_stock: 1500000, record_count: 20 },
    { experience_years: 7, avg_total_compensation: 8500000, avg_base_salary: 5500000, avg_bonus: 1100000, avg_stock: 1900000, record_count: 18 },
    { experience_years: 8, avg_total_compensation: 10000000, avg_base_salary: 6200000, avg_bonus: 1300000, avg_stock: 2500000, record_count: 15 },
    { experience_years: 9, avg_total_compensation: 11500000, avg_base_salary: 7000000, avg_bonus: 1500000, avg_stock: 3000000, record_count: 12 },
    { experience_years: 10, avg_total_compensation: 13000000, avg_base_salary: 7800000, avg_bonus: 1700000, avg_stock: 3500000, record_count: 10 },
    { experience_years: 12, avg_total_compensation: 15500000, avg_base_salary: 9000000, avg_bonus: 2000000, avg_stock: 4500000, record_count: 8 },
    { experience_years: 15, avg_total_compensation: 20000000, avg_base_salary: 11000000, avg_bonus: 2500000, avg_stock: 6500000, record_count: 6 },
  ]
}

// ── 4. Skills ──────────────────────────────────────────────────────

function mockSkills(): SkillData[] {
  return [
    { name: 'Python', category: 'LANGUAGE', growth_pct: 35, is_emerging: false, is_top: true, relevance_score: 95 },
    { name: 'System Design', category: 'TECHNOLOGY', growth_pct: 40, is_emerging: false, is_top: true, relevance_score: 92 },
    { name: 'AWS', category: 'PLATFORM', growth_pct: 30, is_emerging: false, is_top: true, relevance_score: 90 },
    { name: 'LLM / Generative AI', category: 'TECHNOLOGY', growth_pct: 80, is_emerging: true, is_top: true, relevance_score: 95 },
    { name: 'Machine Learning', category: 'TECHNOLOGY', growth_pct: 55, is_emerging: true, is_top: true, relevance_score: 88 },
    { name: 'Kubernetes', category: 'PLATFORM', growth_pct: 60, is_emerging: true, is_top: true, relevance_score: 85 },
    { name: 'TypeScript', category: 'LANGUAGE', growth_pct: 45, is_emerging: false, is_top: true, relevance_score: 88 },
    { name: 'React', category: 'FRAMEWORK', growth_pct: 25, is_emerging: false, is_top: true, relevance_score: 85 },
    { name: 'DevOps', category: 'TECHNOLOGY', growth_pct: 30, is_emerging: false, is_top: true, relevance_score: 84 },
    { name: 'TensorFlow', category: 'FRAMEWORK', growth_pct: 50, is_emerging: true, is_top: false, relevance_score: 78 },
    { name: 'Go', category: 'LANGUAGE', growth_pct: 55, is_emerging: true, is_top: false, relevance_score: 75 },
    { name: 'Rust', category: 'LANGUAGE', growth_pct: 65, is_emerging: true, is_top: false, relevance_score: 65 },
    { name: 'GraphQL', category: 'TECHNOLOGY', growth_pct: 40, is_emerging: true, is_top: false, relevance_score: 72 },
    { name: 'Terraform', category: 'PLATFORM', growth_pct: 50, is_emerging: true, is_top: false, relevance_score: 70 },
    { name: 'PyTorch', category: 'FRAMEWORK', growth_pct: 55, is_emerging: true, is_top: false, relevance_score: 76 },
    { name: 'Docker', category: 'PLATFORM', growth_pct: 30, is_emerging: false, is_top: false, relevance_score: 82 },
    { name: 'Apache Kafka', category: 'TECHNOLOGY', growth_pct: 35, is_emerging: false, is_top: false, relevance_score: 76 },
    { name: 'PostgreSQL', category: 'TECHNOLOGY', growth_pct: 20, is_emerging: false, is_top: false, relevance_score: 80 },
    { name: 'Redis', category: 'TECHNOLOGY', growth_pct: 25, is_emerging: false, is_top: false, relevance_score: 72 },
    { name: 'Azure', category: 'PLATFORM', growth_pct: 25, is_emerging: false, is_top: false, relevance_score: 74 },
  ]
}

// ── 5. Career Outcomes ─────────────────────────────────────────────

function mockOutcomes(): CareerOutcomeData[] {
  return [
    { type: 'NEXT_COMPANY', label: 'Most Common Next Company', value: 'Amazon', sublabel: 'Infosys → Amazon is the top transition', trend_pct: 18 },
    { type: 'NEXT_ROLE', label: 'Most Common Next Role', value: 'Senior Software Engineer', sublabel: '62% of engineers promoted within 3 years', trend_pct: 12 },
    { type: 'AVG_SALARY', label: 'Average Salary After 5 Years', value: '₹28,00,000', sublabel: 'Across all roles and companies', trend_pct: 8 },
    { type: 'SUCCESS_METRIC', label: 'Promotion Rate', value: '68%', sublabel: 'Engineers promoted within 4 years', trend_pct: 5 },
    { type: 'NEXT_COMPANY', label: 'Top Product Company Exit', value: 'Google India', sublabel: 'Most common from Amazon', trend_pct: 15 },
    { type: 'NEXT_ROLE', label: 'Fastest Growing Role', value: 'AI/ML Engineer', sublabel: '3.2× growth in job postings YoY', trend_pct: 42 },
    { type: 'AVG_SALARY', label: 'FAANG Avg TC (5+ yrs)', value: '₹65,00,000', sublabel: 'Median total compensation', trend_pct: 22 },
    { type: 'SUCCESS_METRIC', label: 'Switch vs Stay Delta', value: '+65%', sublabel: 'Avg increase when switching companies', trend_pct: 3 },
  ]
}

// ── 6. Analytics ───────────────────────────────────────────────────

function mockAnalytics(): CareerAnalyticsDimension[] {
  return [
    { label: 'Avg Years to Senior', value: '3.8 yrs', sublabel: 'SDE I → SDE II/IC4', change_pct: -5, direction: 'down' },
    { label: 'Top Promoter Company', value: 'Amazon', sublabel: 'Most internal promotions to SDE III', change_pct: 12, direction: 'up' },
    { label: 'Highest Growth Skill', value: 'LLM / Gen AI', sublabel: '80% YoY growth in mentions', change_pct: 80, direction: 'up' },
    { label: 'Avg TC Growth (5yr)', value: '₹3.2 Cr → ₹6.5 Cr', sublabel: '5-year total compensation growth', change_pct: 103, direction: 'up' },
    { label: 'Stock Compensation Avg', value: '₹12,00,000/yr', sublabel: 'Across all levels, Bengaluru', change_pct: 18, direction: 'up' },
    { label: 'Career Switch Rate', value: '42%', sublabel: 'Engineers who switch in first 3 years', change_pct: -3, direction: 'down' },
  ]
}

// ═══════════════════════════════════════════════════════════════════════
//  FILTER HELPERS
// ═══════════════════════════════════════════════════════════════════════

function filterTransitions(list: CareerTransition[], f: CareerFilters): CareerTransition[] {
  return list.filter((t) => {
    if (f.company) {
      const c = f.company.toLowerCase()
      if (t.from_company.toLowerCase() !== c && t.to_company.toLowerCase() !== c) return false
    }
    if (f.role) {
      const r = f.role.toLowerCase()
      if (t.from_role.toLowerCase() !== r && t.to_role.toLowerCase() !== r) return false
    }
    return true
  })
}

// ═══════════════════════════════════════════════════════════════════════
//  PUBLIC API — single entry point
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all career data.
 *
 * ── Usage ──
 *   import { getCareerData } from '@/career/careerService'
 *   const { data } = await getCareerData({ company: 'amazon' })
 *
 * ── Future ──
 *   Replace the internals with:
 *     const db = await prisma.salary.groupBy(...)
 *     return { data: { ...computed, fromDb }, filters }
 */
export async function getCareerData(filters: CareerFilters = {}): Promise<CareerData> {
  // Simulate async I/O so the caller already uses await
  // (seamless swap to Prisma or fetch later)
  await Promise.resolve()

  const allTransitions = mockTransitions()
  const transitions = filterTransitions(allTransitions, filters)
  const promotionTimeline = mockPromotionTimeline()
  const compensationProgression = mockCompensationProgression()
  const skillProgression = mockSkills()
  const careerOutcomes = mockOutcomes()
  const analytics = mockAnalytics()

  return {
    data: {
      transitions,
      promotionTimeline,
      compensationProgression,
      skillProgression,
      careerOutcomes,
      analytics,
    },
    filters,
  }
}

/**
 * Convenience export for individual lookups — same contract as getCareerData
 * but skips sections the caller doesn't need.
 * (Useful when the real data source is expensive.)
 */
export async function getCareerTransitions(filters: CareerFilters = {}): Promise<CareerTransition[]> {
  await Promise.resolve()
  return filterTransitions(mockTransitions(), filters)
}

export async function getPromotionTimeline(): Promise<PromotionStep[]> {
  await Promise.resolve()
  return mockPromotionTimeline()
}

export async function getCompensationProgression(): Promise<CompensationPoint[]> {
  await Promise.resolve()
  return mockCompensationProgression()
}

export async function getSkillProgression(): Promise<SkillData[]> {
  await Promise.resolve()
  return mockSkills()
}

export async function getCareerOutcomes(): Promise<CareerOutcomeData[]> {
  await Promise.resolve()
  return mockOutcomes()
}

export async function getCareerAnalytics(): Promise<CareerAnalyticsDimension[]> {
  await Promise.resolve()
  return mockAnalytics()
}
