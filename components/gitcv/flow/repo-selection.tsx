'use client'

import { ArrowRight, GitFork, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { REPOS } from '@/lib/landing-data'
import { cn } from '@/lib/utils'

export function RepoSelection({ username, jobDescription }: { username?: string; jobDescription?: string }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  function toggleRepository(name: string) {
    setSelected((current) =>
      current.includes(name)
        ? current.filter((repo) => repo !== name)
        : [...current, name],
    )
  }

  function continueToPreview() {
    const params = new URLSearchParams({ repos: selected.join(',') })
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
        {REPOS.map((repo) => {
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
        <span className="label-mono text-faint">mock repository data</span>
        <Button type="button" variant="brand" size="lg" onClick={continueToPreview} disabled={selected.length === 0}>
          Continue
          <ArrowRight />
        </Button>
      </div>
    </div>
  )
}
