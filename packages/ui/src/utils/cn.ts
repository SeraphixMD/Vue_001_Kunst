import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind class strings with conflict resolution.
 * Used internally by components to combine cva output with consumer-provided
 * layout utilities. The layout-only restriction on consumer classes is enforced
 * at lint time, not here.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
