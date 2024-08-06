<script setup>

const props = defineProps({
  response: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(["display-info"]);

</script>
<template>
  <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="rounded-t-lg border-b border-gray-700 shadow-lg text-xs text-gray-600 uppercase bg-green-300 dark:bg-slate-800/70 dark:text-green-400 text-center">
      <tr class = "p-5 bg-green-300 dark:bg-slate-700 z-10 rounded">
        <th scope="col" class="p-5">Frequency</th>
        <th scope="col" class="p-5">Title</th>
        <th scope="col" class="p-5">Type</th>
        <th scope="col" class="p-5">Start</th>
        <th scope="col" class="p-5">End</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-if = "props.response.length > 0"
      v-for = "schedule in props.response"
      key = "schedule.id"
      class = "p-2 w-full bg-slate-100 border-b dark:bg-slate-800/70 dark:border-slate-700 hover:cursor-pointer dark:hover:bg-slate-700/70 hover:bg-slate-200"
      @click = "emit('display-info', schedule.id)"
      >
        <td class = "px-4 py-4 font-bold" :style = "{ color: schedule.backgroundColor }">{{ schedule.frequency }}</td>
        <td class = "px-4 py-4 font-bold" >{{ schedule.title }}</td>
        <td class = "px-4 py-4">{{ schedule.maintenanceType }}</td>
        <td class = "px-4 py-4">{{ schedule.start }}</td>
        <td class = "px-4 py-4">{{ schedule.end }}</td>
      </tr>
      <tr class = "p-2 w-full bg-slate-100 border-b dark:bg-slate-800/70 dark:border-slate-700" v-else>
        <td colspan="5" class = "px-4 py-4 text-center uppercase font-bold">No Work Order Service found.</td>
      </tr>
    </tbody>
  </table>
</template>