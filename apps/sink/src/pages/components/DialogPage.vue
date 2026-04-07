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
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger as-child>
          <Button>Open default</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Default dialog</DialogTitle>
          <DialogDescription>
            This is a dialog with the default size and variant. Close it with
            Escape, clicking outside, or the close button.
          </DialogDescription>
          <div class="mt-4 flex justify-end gap-2">
            <DialogClose as-child>
              <Button
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose as-child>
              <Button size="sm">
                Confirm
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            Open small
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogTitle>Small dialog</DialogTitle>
          <DialogDescription>
            A tighter dialog for terse confirmations.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
