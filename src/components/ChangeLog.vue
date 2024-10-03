<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useToast } from "vue-toastification";
import { __ENV__, AMS_MODEL_PATH } from "../assets/global.js"; 
import ChangeLogRow from './ChangeLogRow.vue';

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  formOrigin: {
    type: String,
    required: true
  }
});

const referenceId = ref(props.id);
const changeLogs = ref([]);
const toast = useToast();
const getChangeLog = async () => {
  try {
    const { data } = await axios.get(AMS_MODEL_PATH, {
      params: {
        id:referenceId.value,
        form: "Service Log",
        type: props.formOrigin
      },
      headers: {
        "Content-Type":"application/json",
        "Event-Key":"get-change-log"
      },
      data: {}
    });
    const { success, message, result } = data;
    if (!success) {
      throw new Error(message);
    }
    changeLogs.value = result;
  } catch (error) {
    toast.warning(error.message, {
      icon: "fa-solid fa-triangle-exclamation",
    });
  }
}
onMounted(() => {
  getChangeLog();
});
</script>
<template>
  <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class = "rounded-t-lg border-b border-gray-700 shadow-lg text-xs text-gray-600 uppercase bg-green-300 dark:bg-slate-700/70 dark:text-green-400">
      <tr class = "rounded">
        <th scope="col" class="p-5"></th>
        <th scope="col" class="p-5">Requested By</th>
        <th scope="col" class="p-5">Request Type</th>
        <th scope="col" class="p-5">Date Requested</th>
        <th scope="col" class="p-5">Remarks</th>
        <th scope="col" class="p-5">Status</th>
      </tr>
    </thead>
    <tbody>
      <ChangeLogRow
        :changeLog = "changeLog"
        v-if = "changeLogs.length > 0"
        v-for = "changeLog in changeLogs"
        @get-change-log = "getChangeLog"
      />
      <tr class = "p-2 bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700" v-else>
        <td colspan="6" class = "px-4 py-4 uppercase font-bold text-center">No Change Log record found</td>
      </tr>
    </tbody>
  </table>
</template>
