<script setup>
import { ref } from 'vue';
import ServiceTableRow from './ServiceTableRow.vue';
const props = defineProps({
  serviceData: {
    type: Array,
    require: true
  },
  assetId: {
    type: Number,
    required: true
  },
  workOrderId: {
    type: Number,
    required: true
  }
});

</script>

<template>
  <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="rounded-t-lg border-b shadow-lg text-xs text-gray-600 uppercase bg-green-300 dark:bg-slate-700/70 dark:text-green-400">
      <tr class = "rounded">
        <th scope="col" class="p-5">Service</th>
        <th scope="col" class="p-5">Status</th>
        <th scope="col" class=""></th>
      </tr>
    </thead>
    <tbody>
      <ServiceTableRow
        v-for = "service in serviceData"
        v-if = "serviceData.length > 0"
        :service = "service"
        :key = "service.id"
        :assetId = "props.assetId"
        :serviceCount = "serviceData.length"
        :workOrderId = "props.workOrderId"
      />
      <tr aria-colspan="3" v-else>
        <td class = "uppercase font-bold">No Work Order Service found.</td>
      </tr>
    </tbody>
  </table>
</template>