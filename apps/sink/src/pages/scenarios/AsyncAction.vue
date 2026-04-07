<script setup lang="ts">
import { ref } from 'vue'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Spinner,
} from '@kunst/ui'

const saving = ref(false)
const deleting = ref(false)

function handleSave() {
  saving.value = true
  globalThis.setTimeout(() => { saving.value = false }, 2000)
}

function handleDelete() {
  deleting.value = true
  globalThis.setTimeout(() => { deleting.value = false }, 2000)
}
</script>

<template>
  <Card class="mx-auto w-full max-w-sm">
    <CardHeader>
      <CardTitle>Async actions</CardTitle>
      <CardDescription>Button + Spinner loading composition pattern.</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <Button
        :disabled="saving"
        @click="handleSave"
      >
        <Spinner v-if="saving" />
        {{ saving ? 'Saving...' : 'Save changes' }}
      </Button>
      <Button
        variant="destructive"
        :disabled="deleting"
        @click="handleDelete"
      >
        <Spinner v-if="deleting" />
        {{ deleting ? 'Deleting...' : 'Delete project' }}
      </Button>
      <Button
        variant="outline"
        disabled
      >
        <Spinner />
        Loading...
      </Button>
    </CardContent>
  </Card>
</template>
