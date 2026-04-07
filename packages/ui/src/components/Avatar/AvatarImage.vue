<script setup lang="ts">
import { AvatarImage as RekaAvatarImage } from 'reka-ui'
import { cn } from '../../utils/cn.ts'

const props = defineProps<{
  class?: string
  src?: string
  alt?: string
}>()
</script>

<template>
  <RekaAvatarImage
    :src="props.src ?? ''"
    :alt="props.alt"
    :class="cn('aspect-square h-full w-full', props.class)"
  />
</template>
