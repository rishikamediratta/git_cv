import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { ProductVisual } from '@/components/gitcv/landing/product-visual'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="border-x border-border">
      {/* Headline block */}
      <div className="px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16">
        <span className="label-mono text-brand">
          / gitcv — developer career intelligence
        </span>

        <h1 className="mt-8 max-w-4xl text-pretty text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          Your code already
          <br className="hidden sm:block" /> tells{' '}
          <span className="text-brand">your story</span>.
        </h1>

        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          GitCV turns your GitHub work into evidence-backed, job-specific resume
          content. Point it at a role, and it surfaces the projects and skills
          that actually prove you can do it.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
          <Button
            variant="mono"
            size="lg"
            nativeButton={false}
            className="w-full sm:w-auto"
            render={<a href="#how-it-works" />}
          >
            See how it works
          </Button>
        </div>
      </div>

      {/* Product visualization */}
      <div className="border-t border-border px-6 py-10 md:px-12 md:py-14">
        <ProductVisual />
        <p className="label-mono mt-4 text-faint">
          github → analysis → job match → resume · preview with mock data
        </p>
      </div>
    </section>
  )
}
