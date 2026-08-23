'use client'

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function JobDescriptionForm({ username }: { username?: string }) {
  const router = useRouter()
  const [jobDescription, setJobDescription] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = jobDescription.trim()
    if (!value) return

    const params = new URLSearchParams({ jd: value })
    if (username) params.set('username', username)
    router.push(`/select?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="job-description" className="label-mono text-muted-foreground">
        Job description
      </label>
      <textarea
        id="job-description"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste the job description here..."
        required
        className="flex min-h-52 w-full resize-y border border-input bg-surface px-3 py-3 text-sm leading-relaxed text-foreground transition-colors outline-none placeholder:text-faint focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
      />
      <div className="flex justify-end">
        <Button type="submit" variant="brand" size="lg" disabled={!jobDescription.trim()}>
          Continue
          <ArrowRight />
        </Button>
      </div>
    </form>
  )
}
