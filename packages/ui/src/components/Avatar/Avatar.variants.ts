import { cva, type VariantProps } from 'class-variance-authority'

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
      },
      size: {
        sm: 'h-6 w-6 text-xs',
        default: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type AvatarVariantsProps = VariantProps<typeof avatarVariants>
