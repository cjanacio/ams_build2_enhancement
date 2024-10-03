<script setup>
import { ref } from "vue";
import InputTextArea from './InputTextArea.vue';
const emits = defineEmits([
  'submit-cancel',
]);

const reasonForCancellation = defineModel('reasonForCancellation');

</script>
<template>
  <div class='flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
    <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
      <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
        <span class = "">Reason of Cancellation</span>&nbsp;<span class="text-red-500">*</span>
      </div>
      <InputTextArea
        textAreaClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
        v-model = "reasonForCancellation"
      />
      <div class = "flex justify-end items-end mb-4">
        <span class = "uppercase dark:text-slate-400 text-xs justify-end font-medium">{{ reasonForCancellation.length }} / 500</span>
      </div>
      <div class = "flex justify-end items-end mb-6">
        <button
          class='font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50'
          type = "button"
          @click = "emits('submit-cancel')"
          title = "Submit Remarks"
        >
          <i class = "fa-regular fa-paper-plane"></i>&nbsp; Submit
        </button>
      </div>
      
    </div>
  </div>
</template>