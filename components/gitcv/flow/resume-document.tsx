import type { Repo } from '@/lib/landing-data'

export function FlowResumeDocument({
  repos,
  skills,
  username,
  displayName,
}: {
  repos: Repo[]
  skills: string[]
  username: string
  displayName: string
}) {
  return (
    <article className="mx-auto max-w-2xl border border-paper-border bg-paper p-6 text-paper-foreground shadow-sm md:p-10">
      <header className="flex flex-col gap-1 border-b border-paper-border pb-5">
        <h2 className="text-2xl font-semibold tracking-tight">{displayName}</h2>
        <p className="text-sm text-paper-muted">Full-Stack Engineer</p>
        <p className="mt-1 font-mono text-[0.7rem] tracking-tight text-paper-muted">
          {username}@example.com - github.com/{username} - Bengaluru, IN
        </p>
      </header>

      <ResumeBlock title="Summary">
        <p className="text-[0.8rem] leading-relaxed text-paper-muted">
          Full-stack engineer focused on TypeScript web platforms and developer tooling. Evidence assembled from {repos.length} selected public {repos.length === 1 ? 'repository' : 'repositories'} for a senior front-end role.
        </p>
      </ResumeBlock>

      <ResumeBlock title="Skills">
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span key={skill} className="border border-paper-border px-2 py-1 font-mono text-[0.65rem] tracking-tight text-paper-foreground">
              {skill}
            </span>
          ))}
        </div>
      </ResumeBlock>

      <ResumeBlock title="Projects">
        <div className="flex flex-col gap-4">
          {repos.map((repo) => (
            <ResumeEntry key={repo.name} heading={repo.name} meta={repo.tech.join(' - ')} points={[repo.description]} />
          ))}
        </div>
      </ResumeBlock>

      <ResumeBlock title="Experience">
        <ResumeEntry heading="Software Engineer - Northwind Labs" meta="2022 - Present" points={['Led front-end architecture for an internal analytics product.']} />
      </ResumeBlock>

      <div className="mt-5 grid grid-cols-2 gap-5 border-t border-paper-border pt-5">
        <div className="flex flex-col gap-1">
          <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-muted">Education</h3>
          <p className="text-[0.75rem] text-paper-foreground">B.E. Computer Science</p>
          <p className="text-[0.7rem] text-paper-muted">RV College, 2022</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-muted">Certifications</h3>
          <p className="text-[0.75rem] text-paper-foreground">Meta Front-End Developer</p>
          <p className="text-[0.7rem] text-paper-muted">2023</p>
        </div>
      </div>
    </article>
  )
}

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5 flex flex-col gap-2.5">
      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-muted">{title}</h3>
      {children}
    </section>
  )
}

function ResumeEntry({ heading, meta, points }: { heading: string; meta: string; points: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-[0.85rem] font-medium text-paper-foreground">{heading}</h4>
        <span className="shrink-0 font-mono text-[0.65rem] text-paper-muted">{meta}</span>
      </div>
      <ul className="flex flex-col gap-1">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-[0.78rem] leading-relaxed text-paper-muted">
            <span aria-hidden className="mt-1.5 size-1 shrink-0 bg-brand" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
