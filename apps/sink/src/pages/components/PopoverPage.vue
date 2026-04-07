<script setup lang="ts">
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Label,
  Input,
} from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        basic
      </h3>
      <Popover>
        <PopoverTrigger as-child>
          <Button variant="outline">
            Open popover
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <h4 class="font-medium leading-none">
                Dimensions
              </h4>
              <p class="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-4">
                <Label
                  for="width"
                  class="w-16"
                >Width</Label>
                <Input
                  id="width"
                  size="sm"
                  class="flex-1"
                  placeholder="100%"
                />
              </div>
              <div class="flex items-center gap-4">
                <Label
                  for="height"
                  class="w-16"
                >Height</Label>
                <Input
                  id="height"
                  size="sm"
                  class="flex-1"
                  placeholder="25px"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>

    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        alignment
      </h3>
      <div class="flex flex-wrap gap-3">
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">
              Align start
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p class="text-sm">
              Aligned to start.
            </p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">
              Align center
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <p class="text-sm">
              Aligned to center.
            </p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline">
              Align end
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p class="text-sm">
              Aligned to end.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    </section>
  </div>
</template>
