import { cva, type VariantProps } from 'class-variance-authority'

export const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-background',
      },
      size: {
        sm: 'h-9 px-2 py-1',
        default: 'h-10 px-3 py-2',
        lg: 'h-11 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type InputVariantsProps = VariantProps<typeof inputVariants>
