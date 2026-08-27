import { RepoSelection } from '@/components/gitcv/flow/repo-selection'
import { PageHeader } from '@/components/gitcv/page-header'
import { SiteNav } from '@/components/gitcv/site-nav'

type SelectPageProps = { searchParams: Promise<{ username?: string; jd?: string }> }

export default async function SelectPage({ searchParams }: SelectPageProps) {
  const { username, jd } = await searchParams

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <section className="border-x border-b border-border px-6 py-10 md:px-12 md:py-14">
          <PageHeader index="03" eyebrow="Select evidence" title="Choose the repositories that tell your story." description="Select the projects to include in your resume preview." />
          <div className="mt-10 max-w-3xl"><RepoSelection username={username} jobDescription={jd} /></div>
        </section>
      </main>
    </div>
  )
}
