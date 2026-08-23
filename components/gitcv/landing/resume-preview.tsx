import { Divider } from '@/components/gitcv/divider'
import { SectionLabel } from '@/components/gitcv/section-label'

export function ResumePreview() {
  return (
    <section className="border-x border-t border-border">
      <div className="flex flex-col gap-6 px-6 py-10 md:px-12 md:py-14">
        <SectionLabel index="04">The output</SectionLabel>
        <Divider />
        <div className="flex max-w-2xl flex-col gap-4 pt-2">
          <h2 className="text-pretty text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            A resume that reads like your commit history.
          </h2>
          <p className="max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
            Evidence becomes a clean, submittable document — with a match score
            that estimates fit for the role. Shown here as a static preview.
          </p>
        </div>
      </div>

      <div className="grid border-t border-border lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Paper document */}
        <div className="grid-backdrop border-b border-border p-6 md:p-10 lg:border-b-0 lg:border-r">
          <ResumeDocument />
        </div>

        {/* Match score + trace */}
        <aside className="flex flex-col">
          <div className="flex flex-col gap-4 border-b border-border p-6 md:p-8">
            <span className="label-mono text-faint">jd ↔ resume match</span>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-semibold leading-none tracking-tight text-foreground">
                92
              </span>
              <span className="label-mono mb-2 text-brand">% match</span>
            </div>
            <div className="h-1.5 w-full bg-surface-2">
              <div className="h-full w-[92%] bg-brand" />
            </div>
            <span className="label-mono text-faint">
              preview · not yet calculated
            </span>
          </div>

          <div className="flex flex-col gap-3 p-6 md:p-8">
            <span className="label-mono text-muted-foreground">evidence trace</span>
            {[
              { claim: 'Built full-stack web platform', src: 'gitcv' },
              { claim: 'Shipped React front-ends', src: 'moneymate' },
              { claim: 'Designed search backend', src: 'saras-search' },
            ].map((row) => (
              <div
                key={row.src}
                className="flex items-center justify-between gap-3 border-b border-hairline pb-3 last:border-0 last:pb-0"
              >
                <span className="text-xs leading-snug text-muted-foreground">
                  {row.claim}
                </span>
                <span className="label-mono shrink-0 text-brand">
                  {row.src}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

/** Static, realistic resume mock rendered on a fixed light "paper" surface. */
function ResumeDocument() {
  return (
    <article className="mx-auto max-w-2xl border border-paper-border bg-paper p-6 text-paper-foreground shadow-sm md:p-10">
      {/* Header */}
      <header className="flex flex-col gap-1 border-b border-paper-border pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Aditi Rao</h3>
        <p className="text-sm text-paper-muted">Full-Stack Engineer</p>
        <p className="mt-1 font-mono text-[0.7rem] tracking-tight text-paper-muted">
          aditi.rao@example.com · github.com/aditirao · Bengaluru, IN
        </p>
      </header>

      {/* Summary */}
      <ResumeBlock title="Summary">
        <p className="text-[0.8rem] leading-relaxed text-paper-muted">
          Full-stack engineer focused on TypeScript web platforms and
          developer tooling. Evidence assembled from four public repositories
          for a senior front-end role.
        </p>
      </ResumeBlock>

      {/* Skills */}
      <ResumeBlock title="Skills">
        <div className="flex flex-wrap gap-1.5">
          {[
            'TypeScript',
            'React',
            'Next.js',
            'Node.js',
            'Tailwind',
            'PostgreSQL',
          ].map((s) => (
            <span
              key={s}
              className="border border-paper-border px-2 py-1 font-mono text-[0.65rem] tracking-tight text-paper-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </ResumeBlock>

      {/* Projects — the evidence-derived section */}
      <ResumeBlock title="Projects">
        <div className="flex flex-col gap-4">
          <ResumeEntry
            heading="GitCV — Developer Resume Platform"
            meta="Next.js · TypeScript"
            points={[
              'Built an evidence-driven resume generator from GitHub activity.',
              'Designed a technical, accessible UI system from the ground up.',
            ]}
          />
          <ResumeEntry
            heading="MoneyMate — Personal Finance App"
            meta="React · Tailwind"
            points={[
              'Shipped a responsive budgeting client with local-first state.',
            ]}
          />
        </div>
      </ResumeBlock>

      {/* Experience */}
      <ResumeBlock title="Experience">
        <ResumeEntry
          heading="Software Engineer — Northwind Labs"
          meta="2022 — Present"
          points={[
            'Led front-end architecture for an internal analytics product.',
          ]}
        />
      </ResumeBlock>

      {/* Two-up footer sections */}
      <div className="mt-5 grid grid-cols-2 gap-5 border-t border-paper-border pt-5">
        <div className="flex flex-col gap-1">
          <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-muted">
            Education
          </h4>
          <p className="text-[0.75rem] text-paper-foreground">
            B.E. Computer Science
          </p>
          <p className="text-[0.7rem] text-paper-muted">RV College, 2022</p>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-muted">
            Certifications
          </h4>
          <p className="text-[0.75rem] text-paper-foreground">
            Meta Front-End Developer
          </p>
          <p className="text-[0.7rem] text-paper-muted">2023</p>
        </div>
      </div>
    </article>
  )
}

function ResumeBlock({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-5 flex flex-col gap-2.5">
      <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-paper-muted">
        {title}
      </h4>
      {children}
    </section>
  )
}

function ResumeEntry({
  heading,
  meta,
  points,
}: {
  heading: string
  meta: string
  points: string[]
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <h5 className="text-[0.85rem] font-medium text-paper-foreground">
          {heading}
        </h5>
        <span className="shrink-0 font-mono text-[0.65rem] text-paper-muted">
          {meta}
        </span>
      </div>
      <ul className="flex flex-col gap-1">
        {points.map((p) => (
          <li
            key={p}
            className="flex gap-2 text-[0.78rem] leading-relaxed text-paper-muted"
          >
            <span aria-hidden className="mt-1.5 size-1 shrink-0 bg-brand" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  )
}
