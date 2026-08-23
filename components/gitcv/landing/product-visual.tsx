import { Check } from 'lucide-react'

import { REPOS, REQUIREMENTS } from '@/lib/landing-data'
import { cn } from '@/lib/utils'

/**
 * Core GitCV product visualization for the hero.
 *
 * Communicates the real pipeline — INPUT (GitHub evidence) → PROCESS (analysis
 * against job requirements) → OUTPUT (tailored resume + match score) — using
 * the design-system's technical panels, thin borders and restrained blue.
 *
 * All values are static mock data. Nothing here calls an API or computes a
 * score; the motion only signals conceptual data movement.
 */
export function ProductVisual() {
  return (
    <div className="border border-border bg-surface">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="label-mono flex items-center gap-2 text-muted-foreground">
          <span aria-hidden className="size-1.5 animate-pulse-soft bg-brand" />
          gitcv · pipeline
        </span>
        <span className="label-mono text-faint">preview · mock</span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,0.9fr)]">
        {/* INPUT — GitHub evidence */}
        <Stage step="in" title="GitHub Evidence">
          <ul className="flex flex-col gap-2.5">
            {REPOS.slice(0, 3).map((repo) => (
              <li
                key={repo.name}
                className={cn(
                  'border px-3 py-2 transition-colors',
                  repo.matched
                    ? 'border-brand/40 bg-brand-muted'
                    : 'border-border bg-background/40',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-xs text-foreground">
                    {repo.name}
                  </span>
                  {repo.matched ? (
                    <span className="label-mono shrink-0 text-brand">
                      selected
                    </span>
                  ) : null}
                </div>
                <div className="mt-1.5 flex items-center gap-1">
                  {repo.tech.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="label-mono text-[0.625rem] text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Stage>

        <FlowConnector />

        {/* PROCESS — requirement analysis */}
        <Stage step="proc" title="Requirement Match">
          <ul className="flex flex-col gap-2">
            {REQUIREMENTS.map((req) => (
              <li
                key={req.label}
                className="flex items-center justify-between gap-2 border-b border-hairline pb-2 last:border-0 last:pb-0"
              >
                <span className="truncate text-xs text-muted-foreground">
                  {req.label}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 label-mono',
                    req.status === 'met' ? 'text-brand' : 'text-faint',
                  )}
                >
                  {req.status === 'met' ? (
                    <>
                      <Check className="size-3" />
                      met
                    </>
                  ) : (
                    'partial'
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Stage>

        <FlowConnector />

        {/* OUTPUT — resume + match score */}
        <Stage step="out" title="Tailored Resume">
          <div className="flex h-full flex-col justify-between gap-4">
            {/* mini document */}
            <div className="border border-border bg-background/60 p-3">
              <div className="h-1.5 w-16 bg-foreground/80" />
              <div className="mt-2 h-1 w-24 bg-muted-foreground/40" />
              <div className="mt-3 flex flex-col gap-1.5">
                <div className="h-1 w-full bg-muted-foreground/25" />
                <div className="h-1 w-11/12 bg-muted-foreground/25" />
                <div className="h-1 w-4/5 bg-brand/50" />
              </div>
            </div>

            {/* match score */}
            <div>
              <span className="label-mono text-faint">match score</span>
              <div className="mt-1.5 flex items-end gap-2">
                <span className="text-4xl font-semibold leading-none tracking-tight text-foreground">
                  92
                </span>
                <span className="label-mono mb-1 text-brand">/ 100</span>
              </div>
              <div className="mt-3 h-1 w-full bg-surface-2">
                <div className="h-full w-[92%] bg-brand" />
              </div>
            </div>
          </div>
        </Stage>
      </div>
    </div>
  )
}

function Stage({
  step,
  title,
  children,
}: {
  step: 'in' | 'proc' | 'out'
  title: string
  children: React.ReactNode
}) {
  const marker = step === 'in' ? '/ in' : step === 'proc' ? '/ process' : '/ out'
  return (
    <div className="flex flex-col gap-4 border-t border-border p-5 first:border-t-0 lg:border-t-0">
      <div className="flex items-center justify-between">
        <span className="label-mono text-brand">{marker}</span>
        <span className="label-mono text-faint">{title}</span>
      </div>
      {children}
    </div>
  )
}

/**
 * Directional connector between stages. Horizontal line + travelling dot on
 * desktop; vertical on mobile. Motion is disabled under prefers-reduced-motion.
 */
function FlowConnector() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center border-t border-border py-3 lg:border-t-0 lg:px-1 lg:py-0"
    >
      {/* horizontal (desktop) */}
      <div className="relative hidden h-px w-8 bg-border lg:block">
        <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 animate-flow-x bg-brand" />
      </div>
      {/* vertical (mobile / tablet) */}
      <div className="relative block h-8 w-px bg-border lg:hidden">
        <span className="absolute top-0 left-1/2 size-1.5 -translate-x-1/2 animate-flow-y bg-brand" />
      </div>
    </div>
  )
}
