import type { BaseComponentProps } from '../../contracts/base.ts'

export type ToastProps = BaseComponentProps & {
  variant?: 'default' | 'destructive'
}
