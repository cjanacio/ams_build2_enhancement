<script setup>
import { ref } from 'vue';
import ChangeLogRowChild from './ChangeLogRowChild.vue';
import Button from './Button.vue';
const props = defineProps({
  changeLog: {
    type: Object,
    required: true
  }
});
const emits = defineEmits([
  'get-change-log'
]);

const appendChangeLogChild = ref(false);
const handleAppendChild = () => {
  appendChangeLogChild.value = !appendChangeLogChild.value;
}
</script>
<template>
  <tr class = "border p-2 bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700">
    <td class = "px-4 py-4">
      <Button
        v-if = "props.changeLog.requestStatus === 'FOR REVIEW' || props.changeLog.requestType === 'Edit Request'"
        buttonText = ""
        buttonClass = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
        buttonType = "button"
        :onClickEvent = "handleAppendChild"
        :iconSetting = "appendChangeLogChild === true ? 'fa-solid fa-angles-up' : 'fa-solid fa-angles-down'"
        :isDisabled = "false"
        buttonTitle = "View full details"
      />
    </td>
    <td class = "px-4 py-4">
      {{ props.changeLog.changeLogCreator }}
    </td>
    <td class = "px-4 py-4">
      {{ props.changeLog.requestType }}
    </td>
    <td class = "px-4 py-4">
      {{ props.changeLog.changeLogCreation }}
    </td>
    <td class = "px-4 py-4">
      {{ props.changeLog.remarks }}
    </td>
    <td class = "px-4 py-4">
      {{ props.changeLog.requestStatus }}
    </td>
  </tr>
  <ChangeLogRowChild
    @get-change-log = "emits('get-change-log')"
    v-if = "appendChangeLogChild"
    :requestType = "props.changeLog.requestType"
    :details = "props.changeLog.details"
    :status = "props.changeLog.requestStatus"
    :id = "props.changeLog.changeLogId"
    :reviewerRemarks = "props.changeLog.reviewerRemarks"
  />
</template>