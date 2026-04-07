<script setup lang="ts">
import type { PaginationProps } from './Pagination.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = defineProps<PaginationProps>()
</script>

<template>
  <nav
    role="navigation"
    aria-label="pagination"
    :class="cn('mx-auto flex w-full justify-center', props.class)"
  >
    <slot />
  </nav>
</template>
