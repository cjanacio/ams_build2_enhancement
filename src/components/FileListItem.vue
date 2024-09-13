<script setup>
  import { ref, onMounted } from "vue";
  import FileContent from "./FileContent.vue";
  import Button from './Button.vue';
  
  const props = defineProps({
    serviceDoc: {
      type: Object,
      required: true
    },
    
  });
  
  const appendDetails = ref(false);
  const handleChildAppend = () => {
    appendDetails.value = !appendDetails.value;
  }

</script>
<template>
  <li class = "py-2 list-none font-bold dark:text-gray-300 text-gray-800 list-disc" :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
    <Button
      buttonText = ""
      buttonClass = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
      buttonType = "button"
      :onClickEvent = "handleChildAppend"
      :iconSetting = "appendDetails === true ? 'fa-solid fa-angles-up' : 'fa-solid fa-angles-down'"
      :isDisabled = "false"
      buttonTitle = "View full details"
    />&NonBreakingSpace;
    <i class = "fa-solid fa-file-pdf">&nbsp;</i>{{ serviceDoc.name }}
  </li>
  <div v-if = "appendDetails" class = "overflow-y-scroll h-[1000px]">
    <FileContent :base64 = "serviceDoc.base64"/>
  </div>
</template>