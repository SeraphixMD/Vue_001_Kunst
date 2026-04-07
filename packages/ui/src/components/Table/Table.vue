<script setup lang="ts">
import type { TableProps } from './Table.contract.ts'
import { cn } from '../../utils/cn.ts'

const props = defineProps<TableProps>()
</script>

<template>
  <div :class="cn('relative w-full overflow-auto', props.class)">
    <table class="w-full caption-bottom text-sm">
      <slot />
    </table>
  </div>
</template>
