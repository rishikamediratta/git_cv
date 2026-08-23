import { JobDescriptionForm } from '@/components/gitcv/flow/job-description-form'
import { PageHeader } from '@/components/gitcv/page-header'
import { SiteNav } from '@/components/gitcv/site-nav'
import { TechnicalPanel } from '@/components/gitcv/technical-panel'

type JobDescriptionPageProps = { searchParams: Promise<{ username?: string }> }

export default async function JobDescriptionPage({ searchParams }: JobDescriptionPageProps) {
  const { username } = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <section className="border-x border-b border-border px-6 py-10 md:px-12 md:py-14">
          <PageHeader
            index="02"
            eyebrow="Paste job description"
            title="Give the role its proper context."
            description="Paste the job description to carry it through this V0 resume-building flow."
          />
          <TechnicalPanel label="job description" meta="mock input" className="mt-10 max-w-2xl" bodyClassName="p-5 md:p-6">
            <JobDescriptionForm username={username} />
          </TechnicalPanel>
        </section>
      </main>
    </div>
  )
}
