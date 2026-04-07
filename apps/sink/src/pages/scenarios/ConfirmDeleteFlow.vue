<script setup lang="ts">
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
} from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <p class="text-sm text-muted-foreground">
      Click the button below to simulate a destructive-action confirmation flow.
    </p>
    <Dialog default-open>
      <DialogTrigger as-child>
        <Button variant="destructive">
          Delete project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogDescription>
          This will permanently delete the project and all its data. This
          action cannot be undone.
        </DialogDescription>
        <div class="mt-6 flex justify-end gap-2">
          <DialogClose as-child>
            <Button
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose as-child>
            <Button
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
