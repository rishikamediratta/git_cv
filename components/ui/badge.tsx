import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 border font-mono text-[0.6875rem] uppercase tracking-[0.1em] leading-none whitespace-nowrap transition-colors',
  {
    variants: {
      variant: {
        // Neutral technical chip (Reeve-style metadata tag)
        outline: 'border-border bg-transparent text-muted-foreground',
        solid: 'border-transparent bg-secondary text-secondary-foreground',
        brand: 'border-brand/40 bg-brand-muted text-brand',
        muted: 'border-transparent bg-muted text-muted-foreground',
      },
      size: {
        sm: 'px-1.5 py-1',
        default: 'px-2 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
