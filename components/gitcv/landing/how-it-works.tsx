import { ArrowDown, ArrowRight } from 'lucide-react'

import { Divider } from '@/components/gitcv/divider'
import { SectionLabel } from '@/components/gitcv/section-label'
import { WORKFLOW } from '@/lib/landing-data'
import { cn } from '@/lib/utils'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-x border-t border-border">
      {/* Section header */}
      <div className="flex flex-col gap-6 px-6 py-10 md:px-12 md:py-14">
        <SectionLabel index="01">How it works</SectionLabel>
        <Divider />
        <div className="flex max-w-2xl flex-col gap-4 pt-2">
          <h2 className="text-pretty text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            From code to career, in four steps.
          </h2>
          <p className="max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
            GitCV connects the work you have already shipped to the role you
            want next — reading your GitHub, understanding the job, and matching
            the two.
          </p>
        </div>
      </div>

      {/* Stage grid */}
      <div className="grid border-t border-border lg:grid-cols-4">
        {WORKFLOW.map((stage, i) => {
          const isLast = i === WORKFLOW.length - 1
          return (
            <div
              key={stage.index}
              className={cn(
                'relative flex flex-col gap-4 p-6 md:p-8',
                // dividers: bottom on stacked, right on desktop
                !isLast && 'border-b border-border lg:border-b-0 lg:border-r',
              )}
            >
              <div className="flex items-center justify-between">
                <span className="label-mono text-brand">/ {stage.index}</span>
                {!isLast ? (
                  <>
                    <ArrowRight className="hidden size-4 text-faint lg:block" />
                    <ArrowDown className="size-4 text-faint lg:hidden" />
                  </>
                ) : (
                  <span className="size-1.5 bg-brand" aria-hidden />
                )}
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {stage.title}
                </h3>
                <span className="label-mono text-faint">{stage.short}</span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {stage.description}
              </p>

              <span className="label-mono mt-auto pt-4 text-faint">
                {stage.meta}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
