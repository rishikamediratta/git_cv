'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/components/theme/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'inline-flex size-8 items-center justify-center border border-border bg-transparent text-muted-foreground transition-colors',
        'hover:border-brand hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <Sun className={cn('size-4', isDark ? 'hidden' : 'block')} />
      <Moon className={cn('size-4', isDark ? 'block' : 'hidden')} />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
