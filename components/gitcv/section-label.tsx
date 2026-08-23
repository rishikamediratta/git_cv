import { cn } from '@/lib/utils'

type SectionLabelProps = {
  /** Two-digit-style index, e.g. "01". */
  index?: string
  children: React.ReactNode
  className?: string
}

/**
 * Reusable editorial section marker:
 *
 *   / 01
 *   GITHUB SIGNAL
 *
 * Rendered in monospace, subtle, technical.
 */
export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {index ? (
        <span className="label-mono text-brand">/ {index}</span>
      ) : null}
      <span className="label-mono text-muted-foreground">{children}</span>
    </div>
  )
}
