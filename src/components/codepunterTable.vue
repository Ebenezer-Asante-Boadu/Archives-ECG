<template>
    <table class="fixed_header" :class="{ 'striped': striped, 'clickable': clickable }">
        <thead>
            <tr>
                <th v-for="column,index in columns" :key="index">
                    {{ column.key }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row,id in items">
                <td v-for="item in row" :key="row.id">
                    {{ item }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumn, TableData } from '@/lib/types';

const props = defineProps({
    items: {
      type: Array<TableData>,
      required: true
    },
    columns: {
      type: Array<TableColumn>,
      required: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: true
    },
    sort_by: {
        type: String,
        required: true,
    }
})
</script>

<style scoped>
.fixed_header {
    width: 100%;
    width: 100%;
    height: 100%; /* Make the table fill its parent's height */
    border-collapse: collapse;
    background-color: blueviolet;
  }
  .fixed_header tbody {
    display: block;
    width: 100%;
    overflow: auto;
    overflow-y: scroll;
    height: 100%;
  }
  .fixed_header thead tr {
    display: block;
  }
  .fixed_header thead {
    background: black;
    color: #fff;
  }
  .fixed_header th,
  .fixed_header td {
    padding: 5px 55px;
    text-align: left;
    width: fit-content;
  }
</style>