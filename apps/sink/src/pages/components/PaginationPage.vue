<script setup lang="ts">
import { ref } from 'vue'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@kunst/ui'

const currentPage = ref(2)
const totalPages = 10

function goTo(p: number) {
  if (p >= 1 && p <= totalPages) currentPage.value = p
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <h3 class="mb-3 text-sm font-medium text-muted-foreground">
        basic
      </h3>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              :disabled="currentPage <= 1"
              @click="goTo(currentPage - 1)"
            />
          </PaginationItem>
          <PaginationItem v-if="currentPage > 2">
            <PaginationLink @click="goTo(1)">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem v-if="currentPage > 3">
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem v-if="currentPage > 1">
            <PaginationLink @click="goTo(currentPage - 1)">
              {{ currentPage - 1 }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink is-active>
              {{ currentPage }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem v-if="currentPage < totalPages">
            <PaginationLink @click="goTo(currentPage + 1)">
              {{ currentPage + 1 }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem v-if="currentPage < totalPages - 2">
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem v-if="currentPage < totalPages - 1">
            <PaginationLink @click="goTo(totalPages)">
              {{ totalPages }}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              :disabled="currentPage >= totalPages"
              @click="goTo(currentPage + 1)"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  </div>
</template>
