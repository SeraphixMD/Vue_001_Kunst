import { cva, type VariantProps } from 'class-variance-authority'

export const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full bg-muted',
  {
    variants: {
      variant: {
        default: 'bg-muted',
      },
      size: {
        sm: 'h-8 w-8',
        default: 'h-10 w-10',
        lg: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type AvatarVariantsProps = VariantProps<typeof avatarVariants>
