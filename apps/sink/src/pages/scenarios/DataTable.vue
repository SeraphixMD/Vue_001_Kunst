<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Badge,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@kunst/ui'

const allUsers = [
  { name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active' },
  { name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Inactive' },
  { name: 'Frank Miller', email: 'frank@example.com', role: 'Viewer', status: 'Active' },
  { name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { name: 'Hank Wilson', email: 'hank@example.com', role: 'Admin', status: 'Active' },
  { name: 'Iris Taylor', email: 'iris@example.com', role: 'Viewer', status: 'Inactive' },
  { name: 'Jack Martin', email: 'jack@example.com', role: 'Editor', status: 'Inactive' },
  { name: 'Karen Clark', email: 'karen@example.com', role: 'Admin', status: 'Active' },
  { name: 'Leo Harris', email: 'leo@example.com', role: 'Viewer', status: 'Active' },
  { name: 'Mia Robinson', email: 'mia@example.com', role: 'Editor', status: 'Active' },
  { name: 'Nate Young', email: 'nate@example.com', role: 'Admin', status: 'Inactive' },
  { name: 'Olivia King', email: 'olivia@example.com', role: 'Viewer', status: 'Active' },
  { name: 'Paul Scott', email: 'paul@example.com', role: 'Editor', status: 'Active' },
  { name: 'Quinn Adams', email: 'quinn@example.com', role: 'Admin', status: 'Active' },
  { name: 'Rose Baker', email: 'rose@example.com', role: 'Viewer', status: 'Inactive' },
]

const roleFilter = ref('')
const statusFilter = ref('')
const page = ref(1)
const pageSize = ref('5')

const filteredUsers = computed(() =>
  allUsers.filter((u) =>
    (!roleFilter.value || u.role === roleFilter.value)
    && (!statusFilter.value || u.status === statusFilter.value),
  ),
)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredUsers.value.length / Number(pageSize.value))),
)

const pagedUsers = computed(() => {
  const size = Number(pageSize.value)
  const start = (page.value - 1) * size
  return filteredUsers.value.slice(start, start + size)
})

const activeFilters = computed(() => {
  const filters: { key: string; label: string }[] = []
  if (roleFilter.value) filters.push({ key: 'role', label: roleFilter.value })
  if (statusFilter.value) filters.push({ key: 'status', label: statusFilter.value })
  return filters
})

watch([roleFilter, statusFilter], () => { page.value = 1 })

function removeFilter(key: string) {
  if (key === 'role') roleFilter.value = ''
  if (key === 'status') statusFilter.value = ''
}

function clearFilters() {
  roleFilter.value = ''
  statusFilter.value = ''
}

function goToPage(p: number) {
  if (p >= 1 && p <= totalPages.value) page.value = p
}
</script>

<template>
  <div class="rounded-lg border border-border bg-card shadow-sm">
    <!-- Toolbar -->
    <div class="flex items-center gap-2 border-b border-border px-3 py-3">
      <Select
        :model-value="roleFilter"
        @update:model-value="(v) => roleFilter = v"
      >
        <SelectTrigger class="w-32">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">
            Admin
          </SelectItem>
          <SelectItem value="Editor">
            Editor
          </SelectItem>
          <SelectItem value="Viewer">
            Viewer
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        :model-value="statusFilter"
        @update:model-value="(v) => statusFilter = v"
      >
        <SelectTrigger class="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Active">
            Active
          </SelectItem>
          <SelectItem value="Inactive">
            Inactive
          </SelectItem>
        </SelectContent>
      </Select>

      <template v-if="activeFilters.length">
        <div class="mx-1 h-4 w-px bg-border" />

        <div class="flex items-center gap-1.5">
          <Badge
            v-for="f in activeFilters"
            :key="f.key"
            variant="secondary"
          >
            {{ f.label }}
            <button
              class="ml-0.5 rounded-sm opacity-60 hover:opacity-100 focus:outline-none"
              :aria-label="`Remove ${f.label} filter`"
              @click="removeFilter(f.key)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            @click="clearFilters"
          >
            Clear all
          </Button>
        </div>
      </template>
    </div>

    <!-- Table -->
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="user in pagedUsers"
          :key="user.email"
        >
          <TableCell>
            <span class="font-medium text-foreground">{{ user.name }}</span>
          </TableCell>
          <TableCell>
            <span class="text-muted-foreground">{{ user.email }}</span>
          </TableCell>
          <TableCell>
            <span class="text-sm text-foreground">{{ user.role }}</span>
          </TableCell>
          <TableCell>
            <Badge :variant="user.status === 'Active' ? 'default' : 'secondary'">
              {{ user.status }}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Footer -->
    <div class="flex items-center justify-between border-t border-border px-3 py-3">
      <span class="text-xs text-muted-foreground">
        {{ filteredUsers.length }} {{ filteredUsers.length === 1 ? 'result' : 'results' }}
      </span>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <span class="whitespace-nowrap text-xs text-muted-foreground">Rows per page</span>
          <Select
            :model-value="pageSize"
            @update:model-value="(v) => { pageSize = v; page = 1 }"
          >
            <SelectTrigger class="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">
                5
              </SelectItem>
              <SelectItem value="10">
                10
              </SelectItem>
              <SelectItem value="18">
                All
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="h-4 w-px bg-border" />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                :disabled="page <= 1"
                @click="goToPage(page - 1)"
              />
            </PaginationItem>
            <PaginationItem v-if="page > 2">
              <PaginationLink @click="goToPage(1)">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem v-if="page > 3">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem v-if="page > 1">
              <PaginationLink @click="goToPage(page - 1)">
                {{ page - 1 }}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink is-active>
                {{ page }}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem v-if="page < totalPages">
              <PaginationLink @click="goToPage(page + 1)">
                {{ page + 1 }}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem v-if="page < totalPages - 2">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem v-if="page < totalPages - 1">
              <PaginationLink @click="goToPage(totalPages)">
                {{ totalPages }}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                :disabled="page >= totalPages"
                @click="goToPage(page + 1)"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </div>
</template>
