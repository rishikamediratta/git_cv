import { Divider } from '@/components/gitcv/divider'
import { SectionLabel } from '@/components/gitcv/section-label'
import { cn } from '@/lib/utils'

type PageHeaderProps = {
  index?: string
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

/**
 * Editorial page/section header: section marker, large confident heading,
 * subordinate description, framed by hairline dividers.
 */
export function PageHeader({
  index,
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-6', className)}>
      {eyebrow || index ? (
        <SectionLabel index={index}>{eyebrow}</SectionLabel>
      ) : null}

      <Divider />

      <div className="flex flex-col gap-6 pt-2 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-pretty text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-3">{actions}</div>
        ) : null}
      </div>
    </header>
  )
}
