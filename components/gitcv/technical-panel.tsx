import { cn } from '@/lib/utils'

type TechnicalPanelProps = {
  /** Left-aligned monospace label in the header bar. */
  label?: string
  /** Right-aligned monospace annotation in the header bar. */
  meta?: string
  /** Render a faint grid backdrop inside the body. */
  grid?: boolean
  children?: React.ReactNode
  className?: string
  bodyClassName?: string
}

/**
 * Bordered technical container with an optional monospace header bar — the
 * primary structural surface for GitCV (used instead of rounded cards).
 */
export function TechnicalPanel({
  label,
  meta,
  grid = false,
  children,
  className,
  bodyClassName,
}: TechnicalPanelProps) {
  const hasHeader = Boolean(label || meta)

  return (
    <div
      className={cn(
        'border border-border bg-surface',
        className,
      )}
    >
      {hasHeader ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="label-mono flex items-center gap-2 text-muted-foreground">
            {label ? (
              <>
                <span aria-hidden className="size-1.5 bg-brand" />
                {label}
              </>
            ) : null}
          </span>
          {meta ? (
            <span className="label-mono text-faint">{meta}</span>
          ) : null}
        </div>
      ) : null}

      <div className={cn(grid && 'grid-backdrop', 'p-6', bodyClassName)}>
        {children}
      </div>
    </div>
  )
}
