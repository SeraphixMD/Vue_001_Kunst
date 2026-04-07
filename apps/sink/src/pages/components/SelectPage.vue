<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">basic</h3>
      <Select>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectContent>
      </Select>
    </section>

    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">grouped</h3>
      <Select>
        <SelectTrigger class="w-[240px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern (UTC-5)</SelectItem>
            <SelectItem value="cst">Central (UTC-6)</SelectItem>
            <SelectItem value="pst">Pacific (UTC-8)</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Europe</SelectLabel>
            <SelectItem value="gmt">GMT (UTC+0)</SelectItem>
            <SelectItem value="cet">Central European (UTC+1)</SelectItem>
            <SelectItem value="eet">Eastern European (UTC+2)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>

    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">disabled</h3>
      <Select disabled>
        <SelectTrigger class="w-[180px]">
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    </section>
  </div>
</template>
