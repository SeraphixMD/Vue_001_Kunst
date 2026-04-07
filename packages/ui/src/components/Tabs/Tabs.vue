<script setup lang="ts">
import { TabsRoot } from 'reka-ui'
import type { TabsProps } from './Tabs.contract.ts'
import { cn } from '../../utils/cn.ts'

defineOptions({ inheritAttrs: false })

const props = defineProps<TabsProps>()
</script>

<template>
  <TabsRoot
    v-bind="$attrs"
    :class="cn(props.class)"
  >
    <slot />
  </TabsRoot>
</template>
