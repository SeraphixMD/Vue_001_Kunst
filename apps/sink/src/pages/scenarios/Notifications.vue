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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@kunst/ui'

interface ToastItem {
  id: number
  title: string
  description: string
  variant?: 'default' | 'destructive'
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
        <h3 class="mb-3 text-sm font-medium text-muted-foreground">toast notifications</h3>
        <div class="flex flex-wrap gap-3">
          <Button @click="show({ title: 'Saved successfully', description: 'Your changes have been saved.' })">
            Success toast
          </Button>
          <Button
            variant="destructive"
            @click="show({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' })"
          >
            Error toast
          </Button>
          <Button
            variant="outline"
            @click="show({ title: 'Item deleted', description: 'The item has been removed.', action: 'Undo' })"
          >
            Toast with undo
          </Button>
        </div>
      </section>

      <section>
        <h3 class="mb-3 text-sm font-medium text-muted-foreground">popover info</h3>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">Notification preferences</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div class="flex flex-col gap-2">
              <h4 class="font-medium text-sm">Notification settings</h4>
              <p class="text-sm text-muted-foreground">
                Configure how and when you receive notifications. Changes apply immediately.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </section>
    </div>

    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :variant="toast.variant ?? 'default'"
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
