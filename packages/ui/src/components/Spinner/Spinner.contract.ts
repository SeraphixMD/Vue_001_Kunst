import type { BaseComponentProps } from '../../contracts/base.ts'

export type SpinnerProps = BaseComponentProps & {
  size?: 'xs' | 'sm' | 'default' | 'lg'
  label?: string
}
