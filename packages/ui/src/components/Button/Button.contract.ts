import type { VariantComponentProps } from '../../contracts/base.ts'

export type ButtonProps = VariantComponentProps<
  'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
  'sm' | 'default' | 'lg' | 'icon'
>
