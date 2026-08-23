import Link from 'next/link'

import { Logo } from '@/components/gitcv/logo'
import { ThemeToggle } from '@/components/theme/theme-toggle'

const FOOTER_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
  { label: 'Build my resume', href: '/build' },
]

export function SiteFooter() {
  return (
    <footer className="border border-border">
      <div className="flex flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between md:px-12">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Developer career intelligence. GitCV turns your GitHub work into
            evidence-backed, job-specific resume content.
          </p>
          <span className="label-mono text-faint">
            github → job → match → resume
          </span>
        </div>

        <div className="flex items-start gap-12">
          <nav aria-label="Footer" className="flex flex-col gap-3">
            <span className="label-mono text-faint">navigate</span>
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="label-mono text-faint">theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12">
        <span className="label-mono text-faint">
          © {new Date().getFullYear()} gitcv · concept preview
        </span>
        <span className="label-mono text-faint">
          mock data · no github, ai or backend in this build
        </span>
      </div>
    </footer>
  )
}
