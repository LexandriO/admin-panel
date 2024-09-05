<script setup lang="ts">
defineProps<{ data: any[]; columns: any[] }>();
</script>

<template lang="pug">
.table-container
  table
    thead
      tr
        th(v-for="column in columns", :key="column.field")
          slot(:name="`header-${column.field}`")
            | {{ column.label || column.field }}

    tbody
      tr(v-for="(row, rowIndex) in data", :key="rowIndex")
        td(v-for="column in columns", :key="column.field")
          slot(:name="`cell-${column.field}`", :row="row")
            | {{ row[column.field] }}
</template>

<style lang="stylus" scoped>
.table-container
  width 100%
  border-collapse collapse

.table-container table
  width 100%
  border 1px solid #ddd

.table-container th, .table-container td
  padding 8px
  text-align left

.table-container th
  background-color #121212
</style>
