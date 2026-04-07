<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from '@kunst/ui'
</script>

<template>
  <Card class="mx-auto w-full max-w-sm">
    <CardHeader>
      <div class="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarImage
            src="https://i.pravatar.cc/96?img=5"
            alt="Ada Lovelace"
          />
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
        <div class="flex flex-col">
          <span class="text-base font-semibold">Ada Lovelace</span>
          <span class="text-sm text-muted-foreground">Staff Engineer</span>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      Building component libraries that lock visual design so consumers can
      focus on composition instead of styling.
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
      >
        Message
      </Button>
      <Button size="sm">
        Follow
      </Button>
    </CardFooter>
  </Card>
</template>
