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
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@kunst/ui'
</script>

<template>
  <Card class="mx-auto w-full max-w-xl">
    <CardHeader>
      <CardTitle>Account settings</CardTitle>
      <CardDescription>Update your profile and notification preferences.</CardDescription>
    </CardHeader>
    <CardContent>
      <Accordion
        type="single"
        collapsible
        default-value="profile"
      >
        <AccordionItem value="profile">
          <AccordionHeader>
            <AccordionTrigger>Profile</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-col gap-4 pt-2">
              <div class="flex flex-col gap-2">
                <Label for="settings-name">Display name</Label>
                <Input
                  id="settings-name"
                  placeholder="Ada Lovelace"
                />
              </div>
              <div class="flex flex-col gap-2">
                <Label for="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  placeholder="ada@example.com"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications">
          <AccordionHeader>
            <AccordionTrigger>Notifications</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Configure email and push notifications for your account.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="security">
          <AccordionHeader>
            <AccordionTrigger>Security</AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>
            Manage your password and two-factor authentication.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
    <CardFooter class="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
      >
        Cancel
      </Button>
      <Button size="sm">
        Save changes
      </Button>
    </CardFooter>
  </Card>
</template>
