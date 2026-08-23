import { cn } from '@/lib/utils'

type DividerProps = {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/** Low-contrast 1px rule used to structure editorial layouts. */
export function Divider({
  orientation = 'horizontal',
  className,
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        className,
      )}
    />
  )
}
