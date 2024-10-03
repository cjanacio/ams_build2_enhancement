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
  },
  status: {
    type: String,
    required: true
  },
  requestType: {
    type: String,
    required: true
  },
  reviewerRemarks: {
    type: String,
    required: false
  }
  // add: reviewerRemarks, not required
});
const emits = defineEmits([
  'get-change-log'
]);
const id = ref(props.id);
const declineRemarks = ref("");
const appendRemarks = ref(false);
const handleAppendOfReviewRemarks = () => {
  appendRemarks.value = !appendRemarks.value;
}

const handleEditRequest = async (action) => {
  try {
    const auth = await authToken();
    const payLoad = {
      id: id.value
    }
    action === "Reject" ? payLoad.remarks = declineRemarks.value : ""
    const { data } = await axios.post(
      AMS_MODEL_PATH,
      payLoad,
      {
        headers: {
          "Content-Type":"multipart/form-data",
          "Event-Key": action === "Reject" ? "put-decline-edit-req" : "approve-service-log-details",
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
    emits('get-change-log');
    handleAppendOfReviewRemarks();
    toast.success(message, {
      icon: "fa-solid fa-circle-check",
    });
  } catch (error) {
    console.log(error)
  }
}

const handleCancelRequest = async (action) => {
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
          "Event-Key": action === "Reject" ? "put-decline-edit-req" : "approve-service-log-details",
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
    emits('get-change-log');
    toast.success(message, {
      icon: "fa-solid fa-circle-check",
    });
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <tr :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-2 w-full bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700" ref = "childDiv" >
    <td colspan="6" v-if = "appendRemarks === false">
      <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-4 border-x-2 dark:border-x dark:border-slate-800 mx-7 bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit" v-if = "requestType === 'Edit Request'">
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
        <div className = "flex justify-end p-6" v-if = "status === 'FOR REVIEW'">
          <Button
            buttonText = "Approve"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "() => handleEditRequest(`Approve`)"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Approve"
          />
          <Button
            buttonText = "Decline"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-red-500 rounded dark:bg-slate-800 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "() => handleAppendOfReviewRemarks(`Reject`)"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Decline"
          />
        </div>
      </div>
      <div v-else-if = "requestType === 'Cancel Request'">
        <div className = "flex justify-center p-6" v-if = "status === 'FOR REVIEW'">
          <Button
            buttonText = "Approve"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "() => handleCancelRequest(`Approve`)"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Approve"
          />
          <Button
            buttonText = "Decline"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-red-500 rounded dark:bg-slate-800 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "() => handleCancelRequest(`Reject`)"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Approve"
          />
        </div>
      </div>
      <div v-if = "status === 'REJECTED' && props.reviewerRemarks !== 'N/A'">
        <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "px-4 border-x-2 dark:border-x dark:border-slate-800 mx-7 bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit">
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
            <span class = "">Reviewer Remarks</span>
          </div>
          <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-600 mb-10">
            "{{ reviewerRemarks }}"
          </blockquote>
        </div>
      </div>
    </td>
    <td colspan = "6" v-else-if = "appendRemarks === true">
      <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-4 border-x-2 dark:border-x dark:border-slate-800 mx-7 bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit" v-if = "requestType === 'Edit Request'">
        <div className = "flex justify-end">
          <Button
            buttonText = ""
            buttonClass = "mx-1 text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
            buttonType = "button"
            :onClickEvent = "handleAppendOfReviewRemarks"
            iconSetting = "fa-solid fa-times"
            :isDisabled = "false"
            buttonTitle = "Cancel"
          />
        </div>
        
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Remarks</span>
        </div>
        <InputTextArea
          textAreaClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
          v-model = "declineRemarks"
        />
        <div className = "flex justify-end py-4">
          <Button
            buttonText = "Submit"
            buttonClass = "m-1 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "() => requestType === 'Cancel Request' ? handleCancelRequest(`Reject`) : handleEditRequest(`Reject`)"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Submit Reject Remarks"
          />
        </div>
        
      </div>
    </td>
  </tr>
  
</template>