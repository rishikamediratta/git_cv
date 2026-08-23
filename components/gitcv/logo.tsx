import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
  /** Show the small monospace status tag next to the wordmark. */
  showTag?: boolean
}

/**
 * GitCV wordmark. Original mark: a precise blue caret block paired with a
 * tight lowercase sans wordmark — technical, editorial, not decorative.
 */
export function Logo({ className, showTag = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className="grid size-6 place-items-center bg-brand font-mono text-[0.75rem] font-medium leading-none text-brand-foreground"
      >
        {'>'}
      </span>
      <span className="text-[1.05rem] font-semibold tracking-tight text-foreground">
        gitcv
      </span>
      {showTag ? (
        <span className="label-mono mt-0.5 hidden text-faint sm:inline">
          v0
        </span>
      ) : null}
    </span>
  )
}
