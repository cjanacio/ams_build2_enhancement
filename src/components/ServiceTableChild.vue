<script setup>
  import { ref } from "vue";
  import AddServiceLog from "./AddServiceLog.vue";
  const props = defineProps({
    id: {
      type: Number,
      required: true
    }
  });

</script>
<template>
  <tr :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-20 w-full bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700">
    <td colspan="3">
      <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "border-x-2 dark:border-x dark:border-slate-800 mx-7 bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit p-10">
        <AddServiceLog />
      </div>
    </td>
  </tr>
</template>