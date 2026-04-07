<script setup lang="ts">
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@kunst/ui'

const invoices = [
  { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { id: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { id: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
]
</script>

<template>
  <Table>
    <TableCaption>A list of recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-25">
          Invoice
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="invoice in invoices"
        :key="invoice.id"
      >
        <TableCell>{{ invoice.id }}</TableCell>
        <TableCell>{{ invoice.status }}</TableCell>
        <TableCell>{{ invoice.method }}</TableCell>
        <TableCell>{{ invoice.amount }}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell col-span="3">
          Total
        </TableCell>
        <TableCell>$1,750.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
