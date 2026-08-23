'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function GithubForm() {
  const router = useRouter()
  const [identity, setIdentity] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = identity.trim()
    if (!value) return
    router.push(`/build/jd?username=${encodeURIComponent(value)}`)
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
        <Button type="submit" variant="brand" size="lg" disabled={!identity.trim()}>
          Continue
          <ArrowRight />
        </Button>
      </div>
    </form>
  )
}
