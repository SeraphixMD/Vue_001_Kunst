import type { VariantComponentProps } from '../../contracts/base.ts'

export type BadgeProps = VariantComponentProps<
  'default' | 'secondary' | 'destructive' | 'outline'
>
