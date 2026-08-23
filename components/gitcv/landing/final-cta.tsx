import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function FinalCta() {
  return (
    <section className="border-x border-t border-border">
      <div className="grid-backdrop flex flex-col items-start gap-10 px-6 py-20 md:px-12 md:py-28">
        <span className="label-mono text-brand">/ start</span>

        <h2 className="max-w-4xl text-pretty text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
          Your next application starts with the work
          <span className="text-brand"> you&apos;ve already done</span>.
        </h2>

        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Turn a scattered GitHub history into a resume built for the exact role
          in front of you.
        </p>

        <Button
          variant="brand"
          size="lg"
          nativeButton={false}
          className="w-full sm:w-auto"
          render={<Link href="/build" />}
        >
          Build my resume
          <ArrowRight />
        </Button>
      </div>
    </section>
  )
}
