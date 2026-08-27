/**
 * Static mock data for the GitCV landing page.
 *
 * IMPORTANT: everything here is illustrative UI content only. GitCV does not
 * call the GitHub API, run analysis, generate resumes, or compute match scores
 * in this build — these values are hardcoded product-preview mocks.
 */

export type Repo = {
  name: string
  description: string
  tech: string[]
  stars: number
  forks: number
  /** Highlighted as selected evidence in the preview. */
  matched?: boolean
}

export const REPOS: Repo[] = [
  {
    name: 'gitcv',
    description: 'AI-powered developer resume platform.',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    stars: 12,
    forks: 3,
    matched: true,
  },
  {
    name: 'moneymate',
    description: 'Personal finance management application.',
    tech: ['React', 'Tailwind', 'JavaScript'],
    stars: 8,
    forks: 2,
    matched: true,
  },
  {
    name: 'saras-search',
    description: 'Semantic documentation search engine.',
    tech: ['Vue', 'JavaScript'],
    stars: 5,
    forks: 1,
  },
  {
    name: 'chatgpt-extension',
    description: 'Browser extension for AI-assisted workflows.',
    tech: ['JavaScript'],
    stars: 21,
    forks: 6,
  },
]

/** Resolve repository selections carried between the selection and preview steps. */
export function getSelectedRepos(selection?: string | null): Repo[] {
  if (!selection) return []

  const selectedRepositories = parseSelectedRepositories(selection)
  if (selectedRepositories) return selectedRepositories

  const selected = new Set(selection.split(',').filter(Boolean))
  return REPOS.filter((repo) => selected.has(repo.name))
}

function parseSelectedRepositories(selection: string): Repo[] | null {
  try {
    const repositories: unknown = JSON.parse(selection)
    if (!Array.isArray(repositories)) return null

    return repositories.flatMap((repository) => {
      if (!repository || typeof repository !== 'object' || !('name' in repository)) return []

      const { name, description, tech, stars, forks } = repository
      if (typeof name !== 'string') return []

      return [{
        name,
        description: typeof description === 'string' ? description : '',
        tech: Array.isArray(tech) ? tech.filter((item): item is string => typeof item === 'string') : [],
        stars: typeof stars === 'number' ? stars : 0,
        forks: typeof forks === 'number' ? forks : 0,
      }]
    })
  } catch {
    return null
  }
}

export function getRepoSkills(repos: Repo[]): string[] {
  return [...new Set(repos.flatMap((repo) => repo.tech))]
}

export type Requirement = {
  label: string
  status: 'met' | 'partial'
}

export const REQUIREMENTS: Requirement[] = [
  { label: 'React / Next.js', status: 'met' },
  { label: 'TypeScript', status: 'met' },
  { label: 'API / backend design', status: 'met' },
  { label: 'Automated testing', status: 'partial' },
  { label: 'CI / CD', status: 'met' },
]

export type WorkflowStage = {
  index: string
  title: string
  short: string
  description: string
  meta: string
}

export const WORKFLOW: WorkflowStage[] = [
  {
    index: '01',
    title: 'Connect',
    short: 'GitHub',
    description:
      'Your GitHub profile becomes the source of developer evidence — repositories, languages, and project context.',
    meta: 'repos · languages',
  },
  {
    index: '02',
    title: 'Understand',
    short: 'Job Description',
    description:
      'GitCV reads a job description and extracts what the role actually requires, not just keywords.',
    meta: 'jd · requirements',
  },
  {
    index: '03',
    title: 'Match',
    short: 'Project Matching',
    description:
      'The projects and skills most relevant to the role are identified and ranked by supporting evidence.',
    meta: 'evidence · ranking',
  },
  {
    index: '04',
    title: 'Build',
    short: 'Tailored Resume',
    description:
      'Relevant evidence is assembled into a clean, job-specific resume you can export and submit.',
    meta: 'resume · export',
  },
]

export type Feature = {
  label: string
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    label: 'input',
    title: 'GitHub evidence',
    description:
      'Repositories, languages, and project descriptions become a structured record of what you have actually built.',
  },
  {
    label: 'parsing',
    title: 'Job description understanding',
    description:
      'A job description is broken down into concrete requirements so relevance can be judged against real signals.',
  },
  {
    label: 'ranking',
    title: 'Project matching',
    description:
      'Projects are scored against a role and ordered by the strength of the evidence behind each claim.',
  },
  {
    label: 'output',
    title: 'Tailored resume',
    description:
      'A focused resume is assembled per role — the same engineer, framed for the job in front of them.',
  },
  {
    label: 'integrity',
    title: 'Evidence-based claims',
    description:
      'Every line traces back to a repository or contribution, so the resume reflects work rather than adjectives.',
  },
  {
    label: 'roadmap',
    title: 'Match scoring',
    description:
      'A planned JD ↔ resume match score will quantify fit before you apply. Shown here as a preview.',
  },
]
