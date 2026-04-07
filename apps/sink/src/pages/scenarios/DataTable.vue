<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
} from '@kunst/ui'

const allUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Inactive' },
]

const roleFilter = ref('')
const statusFilter = ref('')

const filteredUsers = computed(() =>
  allUsers.filter((u) =>
    (!roleFilter.value || u.role === roleFilter.value)
    && (!statusFilter.value || u.status === statusFilter.value),
  ),
)

function clearFilters() {
  roleFilter.value = ''
  statusFilter.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <Select v-model="roleFilter">
        <SelectTrigger class="w-[150px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Editor">Editor</SelectItem>
          <SelectItem value="Viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <Select v-model="statusFilter">
        <SelectTrigger class="w-[150px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="ghost" size="sm" @click="clearFilters">Clear</Button>
    </div>
    <Table>
      <TableCaption>Team members ({{ filteredUsers.length }} of {{ allUsers.length }})</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user in filteredUsers" :key="user.email">
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.role }}</TableCell>
          <TableCell>{{ user.status }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
