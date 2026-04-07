<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from '@kunst/ui'

interface ToastItem {
  id: number
  title: string
  description: string
  variant: 'default' | 'destructive'
  action?: string
}

const toasts = ref<ToastItem[]>([])
let nextId = 0

function show(item: Omit<ToastItem, 'id'>) {
  toasts.value.push({ ...item, id: ++nextId })
}

function remove(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}
</script>

<template>
  <ToastProvider>
    <div class="flex flex-col gap-8">
      <section>
        <h3 class="mb-3 text-sm font-medium text-muted-foreground">
          variants
        </h3>
        <div class="flex flex-wrap gap-3">
          <Button @click="show({ title: 'Changes saved', description: 'Your settings have been updated.', variant: 'default' })">
            Show default toast
          </Button>
          <Button
            variant="destructive"
            @click="show({ title: 'Something went wrong', description: 'There was a problem with your request.', variant: 'destructive' })"
          >
            Show destructive toast
          </Button>
          <Button
            variant="outline"
            @click="show({ title: 'Event created', description: 'Friday, March 7, 2025 at 3:00 PM', variant: 'default', action: 'Undo' })"
          >
            Show toast with action
          </Button>
        </div>
      </section>
    </div>

    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :variant="toast.variant"
      :duration="5000"
      @update:open="(open) => { if (!open) remove(toast.id) }"
    >
      <div class="flex flex-col gap-1">
        <ToastTitle>{{ toast.title }}</ToastTitle>
        <ToastDescription>{{ toast.description }}</ToastDescription>
      </div>
      <ToastAction
        v-if="toast.action"
        :alt-text="toast.action"
      >
        {{ toast.action }}
      </ToastAction>
      <ToastClose />
    </Toast>

    <ToastViewport />
  </ToastProvider>
</template>
