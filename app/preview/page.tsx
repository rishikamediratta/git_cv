import { FlowResumeDocument } from '@/components/gitcv/flow/resume-document'
import { PageHeader } from '@/components/gitcv/page-header'
import { SiteNav } from '@/components/gitcv/site-nav'
import { getRepoSkills, getSelectedRepos } from '@/lib/landing-data'

type PreviewPageProps = {
  searchParams: Promise<{ repos?: string; username?: string; jd?: string }>
}

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const { repos: selection, username } = await searchParams
  const selectedRepos = getSelectedRepos(selection)
  const skills = getRepoSkills(selectedRepos)
  const normalizedUsername = username?.replace(/^https?:\/\/(www\.)?github\.com\//, '').replace(/\/$/, '') || 'aditirao'
  const displayName = getDisplayName(normalizedUsername)

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        <section className="border-x border-t border-border">
          <div className="px-6 py-10 md:px-12 md:py-14">
            <PageHeader
              index="04"
              eyebrow="Resume preview"
              title="A resume assembled from selected evidence."
              description="This is a local, mock-data preview. Skills and project entries reflect only the repositories selected in the previous step."
            />
          </div>

          <div className="grid border-t border-border lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid-backdrop border-b border-border p-6 md:p-10 lg:border-b-0 lg:border-r">
              <FlowResumeDocument repos={selectedRepos} skills={skills} username={normalizedUsername} displayName={displayName} />
            </div>
            <aside className="flex flex-col">
              <div className="flex flex-col gap-4 border-b border-border p-6 md:p-8">
                <span className="label-mono text-faint">jd / resume match</span>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-semibold leading-none tracking-tight text-foreground">92</span>
                  <span className="label-mono mb-2 text-brand">% match</span>
                </div>
                <div className="h-1.5 w-full bg-surface-2"><div className="h-full w-[92%] bg-brand" /></div>
                <span className="label-mono text-faint">preview - not yet calculated</span>
              </div>
              <div className="flex flex-col gap-3 p-6 md:p-8">
                <span className="label-mono text-muted-foreground">evidence trace</span>
                {selectedRepos.map((repo) => (
                  <div key={repo.name} className="flex items-center justify-between gap-3 border-b border-hairline pb-3 last:border-0 last:pb-0">
                    <span className="text-xs leading-snug text-muted-foreground">{repo.description}</span>
                    <span className="label-mono shrink-0 text-brand">{repo.name}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

function getDisplayName(username: string) {
  const knownProfiles: Record<string, string> = {
    aditirao: 'Aditi Rao',
    rishikamediratta: 'Rishi Kamediratta',
  }

  return knownProfiles[username.toLowerCase()] ?? username
    .split(/[-_.]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
