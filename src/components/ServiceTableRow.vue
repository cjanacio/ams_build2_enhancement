<script setup>
  import { ref } from "vue";
  import ServiceTableChild from "./ServiceTableChild.vue";
  import Button from './Button.vue';
  
  const props = defineProps({
    service: {
      type: Object,
      required: true
    },
    assetId: {
      type: Number,
      required: true
    },
    serviceCount: {
      type: Number,
      required: true
    },
    workOrderId: {
      type: Number,
      required: true
    },
    workOrderRecall: {
      type: Function,
      required: false
    }
  });
  const appendDetails = ref(false);
  const handleChildAppend = () => {
    appendDetails.value = !appendDetails.value;
  }

  const hideChildState = () => {
    appendDetails.value = false;
  }

</script>
<template>
  <tr class = "border-b dark:bg-slate-700/70 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition ease-in-out delay-70 bg-slate-100">
    <td class ="px-6 py-4 font-bold">{{ service.description }}</td>
    <td class ="px-6 py-4">{{ service.serviceResult }}</td>
    <td class ="px-6 py-4 text-center">
      <Button
        v-if = "service.serviceResult !== 'Cancelled'"
        buttonText = ""
        buttonClass = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
        buttonType = "button"
        :onClickEvent = "handleChildAppend"
        :iconSetting = "appendDetails === true ? 'fa-solid fa-angles-up' : 'fa-solid fa-angles-down'"
        :isDisabled = "false"
        buttonTitle = "View full details"
      />
    </td>
  </tr>
  <ServiceTableChild
    v-if = "appendDetails"
    :serviceDetails = "service"
    :assetId = "props.assetId"
    :serviceCount = "props.serviceCount"
    :workOrderId = "props.workOrderId"
    @recall-work-order = "props.workOrderRecall"
    @hide-child-state = "hideChildState"
  />
</template>