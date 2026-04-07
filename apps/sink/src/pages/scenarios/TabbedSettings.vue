<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Label,
  Input,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@kunst/ui'
</script>

<template>
  <Card class="mx-auto w-full max-w-lg">
    <CardHeader>
      <CardTitle>Settings</CardTitle>
      <CardDescription>Manage your account preferences.</CardDescription>
    </CardHeader>
    <CardContent>
      <Tabs default-value="profile">
        <TabsList class="w-full">
          <TabsTrigger
            value="profile"
            class="flex-1"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            class="flex-1"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="display"
            class="flex-1"
          >
            Display
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div class="flex flex-col gap-4 pt-4">
            <div class="flex flex-col gap-2">
              <Label for="name">Display name</Label>
              <Input
                id="name"
                placeholder="Your name"
              />
            </div>
            <div class="flex flex-col gap-2">
              <Label for="bio">Bio</Label>
              <Input
                id="bio"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="notifications">
          <div class="flex flex-col gap-4 pt-4">
            <div class="flex flex-col gap-2">
              <Label for="email-freq">Email frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">
                    Immediate
                  </SelectItem>
                  <SelectItem value="daily">
                    Daily digest
                  </SelectItem>
                  <SelectItem value="weekly">
                    Weekly summary
                  </SelectItem>
                  <SelectItem value="never">
                    Never
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="display">
          <div class="flex flex-col gap-4 pt-4">
            <div class="flex flex-col gap-2">
              <Label for="language">Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    English
                  </SelectItem>
                  <SelectItem value="nl">
                    Nederlands
                  </SelectItem>
                  <SelectItem value="de">
                    Deutsch
                  </SelectItem>
                  <SelectItem value="fr">
                    Francais
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CardContent>
    <CardFooter class="flex justify-end">
      <Button size="sm">
        Save changes
      </Button>
    </CardFooter>
  </Card>
</template>
