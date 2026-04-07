<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Card with full anatomy</CardTitle>
        <CardDescription>
          A card showing header, title, description, content, and footer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Content goes here. This is the body of the card where the primary
        information lives.
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          class="ml-2"
        >
          Save
        </Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Minimal card</CardTitle>
      </CardHeader>
      <CardContent>
        A card with just a title and content — no description, no footer.
      </CardContent>
    </Card>
  </div>
</template>
