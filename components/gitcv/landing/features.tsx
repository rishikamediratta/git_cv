import { Divider } from '@/components/gitcv/divider'
import { SectionLabel } from '@/components/gitcv/section-label'
import { FEATURES } from '@/lib/landing-data'
import { cn } from '@/lib/utils'

export function Features() {
  return (
    <section className="border-x border-t border-border">
      <div className="flex flex-col gap-6 px-6 py-10 md:px-12 md:py-14">
        <SectionLabel index="02">What GitCV does</SectionLabel>
        <Divider />
        <div className="flex max-w-2xl flex-col gap-4 pt-2">
          <h2 className="text-pretty text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Evidence in. Focused resume out.
          </h2>
          <p className="max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
            Six capabilities work together to turn a scattered GitHub history
            into something a hiring team can read in thirty seconds.
          </p>
        </div>
      </div>

      {/* Editorial grid — borders and whitespace, not cards */}
      <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <div
            key={feature.title}
            className={cn(
              'flex flex-col gap-3 border-border p-6 md:p-8',
              'border-b',
              // right dividers per row on larger grids
              'sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0',
              'lg:[&:not(:nth-child(3n))]:border-r',
              // drop bottom border on the final row (best-effort for 6 items)
              i >= FEATURES.length - 1 && 'sm:border-b lg:border-b-0',
            )}
          >
            <span className="label-mono text-brand">/ {feature.label}</span>
            <h3 className="mt-4 text-xl font-medium tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
