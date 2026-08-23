'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

import { Logo } from '@/components/gitcv/logo'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
]

/**
 * Landing navigation shell. Thin bottom border, monospace links, restrained.
 * Collapses into a disclosure menu on mobile rather than shrinking the desktop
 * row.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="GitCV home" className="shrink-0">
          <Logo showTag />
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button
            variant="brand"
            size="sm"
            nativeButton={false}
            className="hidden sm:inline-flex"
            render={<Link href="/build" />}
          >
            Build my resume
            <ArrowRight />
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-brand hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile disclosure */}
      <div
        id="mobile-menu"
        className={cn(
          'overflow-hidden border-t border-border md:hidden',
          open ? 'block' : 'hidden',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-6 py-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="label-mono border-b border-hairline py-4 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="brand"
            size="sm"
            nativeButton={false}
            className="my-4 w-full"
            render={<Link href="/build" />}
          >
            Build my resume
            <ArrowRight />
          </Button>
        </nav>
      </div>
    </header>
  )
}
