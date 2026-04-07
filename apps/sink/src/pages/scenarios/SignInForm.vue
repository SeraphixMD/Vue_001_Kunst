<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Label,
  Input,
  Button,
} from '@kunst/ui'
</script>

<template>
  <Card class="mx-auto w-full max-w-sm">
    <CardHeader>
      <CardTitle>Sign in</CardTitle>
      <CardDescription>Enter your credentials to continue.</CardDescription>
    </CardHeader>
    <CardContent>
      <form
        class="flex flex-col gap-4"
        @submit.prevent
      >
        <div class="flex flex-col gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex justify-between">
      <Button
        variant="ghost"
        size="sm"
      >
        Forgot?
      </Button>
      <Button size="sm">
        Sign in
      </Button>
    </CardFooter>
  </Card>
</template>
