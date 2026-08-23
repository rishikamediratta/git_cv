import { GitFork, Star } from 'lucide-react'

import { Divider } from '@/components/gitcv/divider'
import { SectionLabel } from '@/components/gitcv/section-label'
import { Badge } from '@/components/ui/badge'
import { REPOS } from '@/lib/landing-data'
import { cn } from '@/lib/utils'

export function GithubEvidence() {
  return (
    <section id="about" className="scroll-mt-16 border-x border-t border-border">
      <div className="grid lg:grid-cols-2">
        {/* Narrative */}
        <div className="flex flex-col gap-6 border-b border-border p-6 md:p-12 lg:border-b-0 lg:border-r">
          <SectionLabel index="03">Why GitHub</SectionLabel>
          <Divider />
          <div className="flex max-w-xl flex-col gap-5 pt-2">
            <h2 className="text-pretty text-3xl font-semibold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl">
              Your repositories
              <br className="hidden sm:block" /> are{' '}
              <span className="text-brand">evidence</span>.
            </h2>
            <p className="text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
              A resume claims. A repository proves. GitCV is built to look past
              a flat list of technologies and read the context around your
              work.
            </p>
            <ul className="mt-2 flex flex-col gap-3">
              {[
                'Repository descriptions and project context',
                'Languages and the technologies you actually use',
                'Contributions and the shape of your work',
                'Relevant implementation, matched per role',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 size-1.5 shrink-0 bg-brand"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="label-mono mt-2 text-faint">
              product preview · gitcv does not read github in this build
            </p>
          </div>
        </div>

        {/* Repository preview */}
        <div className="bg-surface/40 p-6 md:p-12">
          <div className="border border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="label-mono flex items-center gap-2 text-muted-foreground">
                <span aria-hidden className="size-1.5 bg-brand" />/
                repositories
              </span>
              <span className="label-mono text-faint">4 · mock</span>
            </div>

            <ul>
              {REPOS.map((repo) => (
                <li
                  key={repo.name}
                  className={cn(
                    'flex flex-col gap-3 border-b border-border p-4 transition-colors last:border-b-0',
                    repo.matched
                      ? 'bg-brand-muted'
                      : 'hover:bg-background/40',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-sm text-foreground">
                      {repo.name}
                    </span>
                    {repo.matched ? (
                      <Badge variant="brand" size="sm">
                        selected
                      </Badge>
                    ) : null}
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {repo.tech.map((t) => (
                      <Badge key={t} size="sm">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="label-mono inline-flex items-center gap-1 text-faint">
                      <Star className="size-3" />
                      {repo.stars}
                    </span>
                    <span className="label-mono inline-flex items-center gap-1 text-faint">
                      <GitFork className="size-3" />
                      {repo.forks}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
