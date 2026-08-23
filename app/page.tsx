import { Features } from '@/components/gitcv/landing/features'
import { FinalCta } from '@/components/gitcv/landing/final-cta'
import { GithubEvidence } from '@/components/gitcv/landing/github-evidence'
import { Hero } from '@/components/gitcv/landing/hero'
import { HowItWorks } from '@/components/gitcv/landing/how-it-works'
import { ResumePreview } from '@/components/gitcv/landing/resume-preview'
import { SiteFooter } from '@/components/gitcv/site-footer'
import { SiteNav } from '@/components/gitcv/site-nav'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <Hero />
        <HowItWorks />
        <Features />
        <GithubEvidence />
        <ResumePreview />
        <FinalCta />
        <SiteFooter />
      </main>

      <div className="h-16" />
    </div>
  )
}
