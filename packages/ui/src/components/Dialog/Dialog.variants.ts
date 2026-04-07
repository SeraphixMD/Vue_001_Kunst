import { cva, type VariantProps } from 'class-variance-authority'

export const dialogVariants = cva(
  'fixed left-1/2 top-1/2 z-modal grid w-full -translate-x-1/2 -translate-y-1/2 gap-3 rounded-sm border border-border bg-background p-5 shadow-lg',
  {
    variants: {
      variant: {
        default: 'text-foreground',
      },
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type DialogVariantsProps = VariantProps<typeof dialogVariants>
