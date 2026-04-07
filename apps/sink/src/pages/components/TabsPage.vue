<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@kunst/ui'
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        basic
      </h3>
      <Tabs
        default-value="account"
        class="w-100"
      >
        <TabsList>
          <TabsTrigger value="account">
            Account
          </TabsTrigger>
          <TabsTrigger value="password">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p class="text-sm text-muted-foreground">
            Make changes to your account here.
          </p>
        </TabsContent>
        <TabsContent value="password">
          <p class="text-sm text-muted-foreground">
            Change your password here.
          </p>
        </TabsContent>
      </Tabs>
    </section>

    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        full width
      </h3>
      <Tabs
        default-value="overview"
        class="w-100"
      >
        <TabsList class="w-full">
          <TabsTrigger
            value="overview"
            class="flex-1"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            class="flex-1"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            class="flex-1"
          >
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p class="text-sm text-muted-foreground">
            Overview content.
          </p>
        </TabsContent>
        <TabsContent value="analytics">
          <p class="text-sm text-muted-foreground">
            Analytics content.
          </p>
        </TabsContent>
        <TabsContent value="reports">
          <p class="text-sm text-muted-foreground">
            Reports content.
          </p>
        </TabsContent>
      </Tabs>
    </section>

    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        with disabled tab
      </h3>
      <Tabs default-value="active">
        <TabsList>
          <TabsTrigger value="active">
            Active
          </TabsTrigger>
          <TabsTrigger
            value="disabled"
            disabled
          >
            Disabled
          </TabsTrigger>
          <TabsTrigger value="other">
            Other
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <p class="text-sm text-muted-foreground">
            Active tab content.
          </p>
        </TabsContent>
        <TabsContent value="other">
          <p class="text-sm text-muted-foreground">
            Other tab content.
          </p>
        </TabsContent>
      </Tabs>
    </section>
  </div>
</template>
