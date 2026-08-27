export type GitHubRepository = {
  name: string
  description: string
  language: string | null
  tags: string[]
  tech: string[]
  stars: number
  forks: number
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000').replace(/\/$/, '')
const REPOSITORY_STORAGE_PREFIX = 'gitcv:repositories:'

export class GitHubApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message)
    this.name = 'GitHubApiError'
  }
}

export function normalizeGitHubUsername(identity: string): string | null {
  const value = identity.trim()
  if (!value) return null

  const urlValue = value.startsWith('http://') || value.startsWith('https://')
    ? value
    : value.startsWith('github.com/') || value.startsWith('www.github.com/')
      ? `https://${value}`
      : null

  if (urlValue) {
    try {
      const url = new URL(urlValue)
      const isGitHubHost = url.hostname === 'github.com' || url.hostname === 'www.github.com'
      const username = url.pathname.split('/').filter(Boolean)[0]
      if (isGitHubHost && username) return username
      return null
    } catch {
      return null
    }
  }

  return value.startsWith('@') ? value.slice(1) : value
}

export async function fetchGitHubRepositories(username: string): Promise<GitHubRepository[]> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/api/github/${encodeURIComponent(username)}/repos`)
  } catch {
    throw new GitHubApiError('Unable to reach the GitCV API. Please try again.')
  }

  const payload: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const detail = isErrorPayload(payload) ? payload.detail : null
    throw new GitHubApiError(detail ?? 'Unable to load GitHub repositories. Please try again.', response.status)
  }

  if (!Array.isArray(payload)) {
    throw new GitHubApiError('GitCV returned an unexpected repository response. Please try again.')
  }

  return payload as GitHubRepository[]
}

export function saveGitHubRepositories(username: string, repositories: GitHubRepository[]) {
  window.sessionStorage.setItem(storageKey(username), JSON.stringify(repositories))
}

export function loadGitHubRepositories(username: string): GitHubRepository[] | null {
  const stored = window.sessionStorage.getItem(storageKey(username))
  if (!stored) return null

  try {
    const repositories: unknown = JSON.parse(stored)
    return Array.isArray(repositories) ? repositories as GitHubRepository[] : null
  } catch {
    window.sessionStorage.removeItem(storageKey(username))
    return null
  }
}

function storageKey(username: string) {
  return `${REPOSITORY_STORAGE_PREFIX}${username.toLowerCase()}`
}

function isErrorPayload(payload: unknown): payload is { detail: string } {
  return Boolean(
    payload
      && typeof payload === 'object'
      && 'detail' in payload
      && typeof payload.detail === 'string',
  )
}
