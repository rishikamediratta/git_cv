import { GithubForm } from '@/components/gitcv/flow/github-form'
import { PageHeader } from '@/components/gitcv/page-header'
import { SiteNav } from '@/components/gitcv/site-nav'
import { TechnicalPanel } from '@/components/gitcv/technical-panel'

export default function BuildPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <section className="border-x border-b border-border px-6 py-10 md:px-12 md:py-14">
          <PageHeader
            index="01"
            eyebrow="Connect GitHub"
            title="Start with the work you have already shipped."
            description="Enter a GitHub identity to load the GitCV product preview. This V0 flow uses local mock repository data only."
          />
          <TechnicalPanel label="github profile" meta="mock input" className="mt-10 max-w-2xl" bodyClassName="p-5 md:p-6">
            <GithubForm />
          </TechnicalPanel>
        </section>
      </main>
    </div>
  )
}
