<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@kunst/ui'
</script>

<template>
  <Accordion
    type="single"
    collapsible
    default-value="item-1"
  >
    <AccordionItem value="item-1">
      <AccordionHeader>
        <AccordionTrigger>What is @kunst/ui?</AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        A Vue 3 component library with a locked visual design — consumers
        compose primitives rather than styling them.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionHeader>
        <AccordionTrigger>How do I change a component's appearance?</AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        Use the variant and size props. Tailwind utility classes for
        appearance are forbidden on library components — only layout
        utilities (flex, grid, gap, margin, padding) are allowed.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionHeader>
        <AccordionTrigger>Can I add my own components?</AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        Yes — use the new-component skill at .claude/skills/new-component/
        which scaffolds from templates and runs verification.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
