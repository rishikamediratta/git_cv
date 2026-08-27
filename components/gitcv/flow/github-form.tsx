'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  fetchGitHubRepositories,
  normalizeGitHubUsername,
  saveGitHubRepositories,
} from '@/lib/github'

export function GithubForm() {
  const router = useRouter()
  const [identity, setIdentity] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const username = normalizeGitHubUsername(identity)

    if (!username) {
      setError('Enter a GitHub username or profile URL.')
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const repositories = await fetchGitHubRepositories(username)
      saveGitHubRepositories(username, repositories)
      router.push(`/select?username=${encodeURIComponent(username)}`)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Unable to load GitHub repositories. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="github-identity" className="label-mono text-muted-foreground">
        GitHub username or profile URL
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="github-identity"
          value={identity}
          onChange={(event) => setIdentity(event.target.value)}
          placeholder="octocat or github.com/octocat"
          autoComplete="url"
          required
          className="h-11"
        />
        <Button type="submit" variant="brand" size="lg" disabled={!identity.trim() || isLoading}>
          {isLoading ? 'Loading...' : 'Continue'}
          <ArrowRight />
        </Button>
      </div>
      {error ? <p className="label-mono text-destructive" role="alert">{error}</p> : null}
    </form>
  )
}
