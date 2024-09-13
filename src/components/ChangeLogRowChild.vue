<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Button from './Button.vue';
import InputTextArea from "./InputTextArea.vue"

import { authToken, AMS_MODEL_PATH } from '../assets/global.js'
import { useToast } from "vue-toastification";
const toast = useToast();
const props = defineProps({
  details: {
    type: Object,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
});

const id = ref(props.id);

const handlDeclineEditRequest = async () => {
  try {
    const auth = await authToken();
    const payLoad = {
      id: id.value
    }
    const { data } = await axios.post(
      AMS_MODEL_PATH,
      payLoad,
      {
        headers: {
          "Content-Type":"multipart/form-data",
          "Event-Key":"put-decline-edit-req",
          "Authorization": auth
        }
      }
    );
    const { success, message } = data;
    if (!success) {
      toast.warning(message, {
        icon: "fa-solid fa-triangle-exclamation",
      });
      return false;
    }
    toast.success(message, {
      icon: "fa-solid fa-triangle-exclamation",
    });
  } catch (error) {
    console.log(error)
  }
}

const handleApproveEditRequest = async () => {
  alert("Approve");
}
</script>
<template>
  <tr :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-2 w-full bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700" ref = "childDiv">
    
    <td colspan="5">
      <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-4 border-x-2 dark:border-x dark:border-slate-800 mx-7 bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit">
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Details</span>
        </div>
        <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class = "rounded-t-lg border-b border-gray-700 shadow-lg text-xs text-gray-600 uppercase bg-green-300 dark:bg-slate-700/70 dark:text-green-400">
            <tr class = "rounded">
              <th scope="col" class="p-5">Column Changed</th>
              <th scope="col" class="p-5">Previous Value</th>
              <th scope="col" class="p-5">New Value</th>
            </tr>
          </thead>
          <tbody>
            <tr class = "p-2 bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700" v-for = "detail in details">
              <td class = "px-4 py-4 uppercase font-bold">{{ detail.columnChanged }}</td>
              <td class = "px-4 py-4">{{ detail.previousValue }}</td>
              <td class = "px-4 py-4">{{ detail.newValue }}</td>
            </tr>
          </tbody>
        </table>
        <div className = "flex justify-end p-6">
          <Button
            buttonText = "Approve"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "handleApproveEditRequest"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Approve"
          />
          <Button
            buttonText = "Decline"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-red-500 rounded dark:bg-slate-800 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "handlDeclineEditRequest"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Approve"
          />
        </div>
      </div>
      
    </td>
  </tr>
</template>