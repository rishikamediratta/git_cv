'use client'

import { ArrowRight, GitFork, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  fetchGitHubRepositories,
  loadGitHubRepositories,
  saveGitHubRepositories,
  type GitHubRepository,
} from '@/lib/github'
import { cn } from '@/lib/utils'

export function RepoSelection({ username, jobDescription }: { username?: string; jobDescription?: string }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [repositories, setRepositories] = useState<GitHubRepository[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(username))

  useEffect(() => {
    let isActive = true

    async function loadRepositories() {
      if (!username) {
        setError('Enter a GitHub username to load repositories.')
        setIsLoading(false)
        return
      }

      const storedRepositories = loadGitHubRepositories(username)
      if (storedRepositories) {
        setRepositories(storedRepositories)
        setIsLoading(false)
        return
      }

      try {
        const fetchedRepositories = await fetchGitHubRepositories(username)
        if (!isActive) return
        saveGitHubRepositories(username, fetchedRepositories)
        setRepositories(fetchedRepositories)
      } catch (caughtError) {
        if (!isActive) return
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Unable to load GitHub repositories. Please try again.',
        )
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    void loadRepositories()

    return () => {
      isActive = false
    }
  }, [username])

  function toggleRepository(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((repo) => repo !== name)
        : [...current, name],
    )
  }

  function continueToPreview() {
    const selectedRepositories = repositories.filter((repository) => selected.includes(repository.name))
    const params = new URLSearchParams({ repos: JSON.stringify(selectedRepositories) })
    if (username) params.set('username', username)
    if (jobDescription) params.set('jd', jobDescription)
    router.push(`/preview?${params.toString()}`)
  }

  return (
    <div className="border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label-mono flex items-center gap-2 text-muted-foreground">
          <span aria-hidden className="size-1.5 bg-brand" />/ repositories
        </span>
        <span className="label-mono text-faint">{selected.length} selected</span>
      </div>

      <ul>
        {isLoading ? (
          <li className="p-4 text-sm text-muted-foreground">Loading repositories...</li>
        ) : error ? (
          <li className="p-4 text-sm text-destructive" role="alert">{error}</li>
        ) : repositories.length === 0 ? (
          <li className="p-4 text-sm text-muted-foreground">No public repositories found for this account.</li>
        ) : repositories.map((repo) => {
          const isSelected = selected.includes(repo.name)
          return (
            <li key={repo.name} className="border-b border-border last:border-b-0">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleRepository(repo.name)}
                className={cn(
                  'flex w-full flex-col gap-3 p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                  isSelected ? 'bg-brand-muted' : 'hover:bg-background/40',
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-sm text-foreground">{repo.name}</span>
                  {isSelected ? <Badge variant="brand" size="sm">selected</Badge> : null}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{repo.description}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {repo.tech.map((tech) => <Badge key={tech} size="sm">{tech}</Badge>)}
                </div>
                <div className="flex items-center gap-4">
                  <span className="label-mono inline-flex items-center gap-1 text-faint"><Star className="size-3" />{repo.stars}</span>
                  <span className="label-mono inline-flex items-center gap-1 text-faint"><GitFork className="size-3" />{repo.forks}</span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-border p-4">
        <span className="label-mono text-faint">live GitHub repository data</span>
        <Button type="button" variant="brand" size="lg" onClick={continueToPreview} disabled={selected.length === 0 || isLoading || Boolean(error)}>
          Continue
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
