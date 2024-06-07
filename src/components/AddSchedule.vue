<script setup>
  import axios, { AxiosError } from 'axios';
  import { useToast } from "vue-toastification";
  import { authToken, AMS_MODEL_PATH } from '../assets/global.js'
  import { ref, onMounted, onUnmounted } from 'vue';
  import Button from "./Button.vue";
  import Input from "./Input.vue";
  import Select from "./Select.vue";
  import TextArea from "./TextArea.vue";
  import AddServiceLog from './AddServiceLog.vue';
  const toast = useToast();

  const props = defineProps({
    closeCallBack: {
      type: Function,
      required: true
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: false,
    },
    id: {
      type: Number,
      required: true,
    }
  });
  const assetId = ref(0);
  const woTitle = ref("");
  const startDate = ref("");
  const endDate = ref("");
  const maintenance = ref("");
  const maintenanceOptions = ref([]);
  const frequency = ref(0);
  const frequencyOptions = ref([]);
  const selectedDescriptions = ref([]);
  const recurrence = ref(0);
  const serviceDescription = ref(0);
  const serviceDescriptionOptions = ref([]);
  const endOfRecurrence = ref("");
  const serviceDescriptionText = ref("");
  const handler = ref(0);
  const handlerOptions = ref([]);
  const serviceResult = ref(0);
  const serviceResultOptions = ref([]);
  const assetStatus = ref(0);
  const assetStatusOptions = ref([]);
  const performedBy = ref("");
  const supervisedBy = ref("");
  const purchaseOrder = ref("");
  const incurredCost = ref("");
  const equipmentUsed = ref("");
  const serviceDocs = ref([]);
  const serviceDocInput = ref(null);

  const validateDateFormat = (dateInput) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateInput)) {
      return false;
    }
    return true;
  }

  const handleServiceType = (e) => {
    e.preventDefault();
    recurrence.value = parseInt(e.target.value) === 3 ? props.start : "";
  }
  
  const handleSaveSchedule = async () => {
    
    if (!woTitle.value || woTitle.value.length === 0) {
      toast.warning("Title field is required.", {
        icon: "fa-solid fa-triangle-exclamation",
      });
      return false;
    }
    if (!startDate.value) {
      toast.warning("Start date is required.", {
        icon: "fa-solid fa-triangle-exclamation",
      });
      return false;
    }
    if (validateDateFormat(startDate.value) === false) {
      toast.warning("Invalid date format on Start date", {
        icon: "fa-solid fa-triangle-exclamation",
      });
      return false;
    }

    if (maintenance.value === 3) { //PM SCHEDULE
      if (selectedDescriptions.value.length === 0) {
        toast.warning("Kindly select atleast ONE(1) Service Description before submitting the form.", {
          icon: "fa-solid fa-triangle-exclamation",
        });
        return false;
      }
    }

    try {
      
      const auth = await authToken();
      const formData = new FormData();
      formData.append("assetId", assetId.value);
      formData.append("maintenanceType", maintenance.value);
      formData.append("title", woTitle.value);
      formData.append("start", startDate.value);
      formData.append("frequency", frequency.value);
      formData.append("descriptions", maintenance.value === 3 ? selectedDescriptions.value : serviceDescriptionText.value);
      endDate.value && formData.append("end", endDate.value);
      endOfRecurrence.value && formData.append("endOfRecurrence", endOfRecurrence.value);
      recurrence.value && formData.append("recurrence", recurrence.value);

      if (maintenance.value === 6) {
        formData.append("handledBy", handler.value);
        if (!handler.value) {
          throw new Error ("Handled By is required.");
        }
        formData.append("performedBy", performedBy.value);
        if (!performedBy.value) {
          throw new Error ("Performed By is required.");
        }
        formData.append("supervisedBy", supervisedBy.value);
        if (!supervisedBy.value) {
          throw new Error ("Supervised By is required.");
        }
        formData.append("serviceStatus", serviceResult.value);
        if (!serviceResult.value) {
          throw new Error ("Service status is required.");
        }
        formData.append("assetStatus", assetStatus.value);
        if (!assetStatus.value) {
          throw new Error ("Asset status is required.");
        }

        if (!serviceDescriptionText.value) {
          throw new Error ("Service Description textbox is required");
        }
        purchaseOrder.value && formData.append("purchaseOrder", purchaseOrder.value);
        incurredCost.value && formData.append("incurredCost", incurredCost.value);
        equipmentUsed.value && formData.append("equipmentUsed", equipmentUsed.value);
        serviceDocs.value.map((file, index) => {
          formData.append(`docs${ index }`, file);
        });
      }

      const { data } = await axios.post(
        AMS_MODEL_PATH,
        formData,
        {
          headers: {
            "Content-Type":"multipart/form-data",
            "Event-Key":"post-work-order",
            "Authorization": auth
          }
        }
      );

      const { success, message } = data;
      if (!success) {
        throw new Error(message);
      }

      toast.success(message, {
        icon: "fa-solid fa-circle-check",
      });
      props.closeCallBack();
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response;
        toast.warning(message, {
          icon: "fa-solid fa-triangle-exclamation",
        });
      } else {
        toast.warning(error.message, {
          icon: "fa-solid fa-triangle-exclamation",
        });
      }
      
      return false;
    }
  }

  const handleFrequencyRule = (value) => {
    const date = new Date(value);
    switch (parseInt(frequency.value)) {
      case 1: /* Semi-Monthly */
        // date.setMonth(date.getMonth() + 1);
        // date.setDate(date.getDate() > 15 ? 0 : (date.getDate() + 15));
        date.setDate(date.getDate() + 15);
        break;
      case 2: /* Monthly */
        date.setMonth(date.getMonth() + 1);
        date.getMonth() === 0 && date.setFullYear(date.getFullYear() + 1);
        break;
      case 3: /* Quarterly */
        date.setMonth(date.getMonth() + 4);
        date.getMonth() === 0 && date.setFullYear(date.getFullYear() + 1);
        break;
      case 4: /* Semi-Annual*/
        date.setMonth(date.getMonth() + 6);
        date.getMonth() === 0 && date.setFullYear(date.getFullYear() + 1);
        break;
      case 5: /* Annual */
        date.setMonth(date.getMonth() + 12);
        date.getMonth() === 0 && date.setFullYear(date.getFullYear() + 1);
        break;
    }
    recurrence.value = date.toISOString().split('T')[0];
  }
  
  const handleFrequency = async (event) => {
    const index = frequencyOptions.value.findIndex(obj => parseInt(obj["id"]) === parseInt(event.target.value));
    serviceDescriptionOptions.value = frequencyOptions.value[index].serviceDescription;
    serviceDescription.value = frequencyOptions.value[index].serviceDescription[0]?.id ? frequencyOptions.value[index].serviceDescription[0].id : 0;
    handleFrequencyRule(startDate.value);
  }

  const handleCloseAddScheduleForm = (e) => {
    if (e.key === "Escape") {
      props.closeCallBack();
      document.body.style.overflowY = "auto"
    }
  }

  const handleFileAttachment = (e) => {
    serviceDocs.value = [];
    const filesAttached = Array.from(e.target.files);
    let validFiles = true;
    filesAttached.map(file => {
      if (file.type !== "application/pdf") {
        toast.warning("You can only attach PDF files", {
          icon: "fa-solid fa-triangle-exclamation",
        });
        validFiles = false;
      }
    });
    if (!validFiles) {
      serviceDocInput.value.clearInputComponent();
      serviceDocs.value = [];

      return false;
    }
    serviceDocs.value.push(...filesAttached);
  }

  onMounted(async () => {
    document.body.style.overflowY = "hidden";
    window.addEventListener("keyup", handleCloseAddScheduleForm);
    startDate.value = props.start;
    endDate.value = props.end;
    assetId.value = props.id;

    const getPredefinedData = async () => {
      try {
        const token = await authToken();
        const payloadHeader = {
          "Content-Type":"application/json",
          "Authorization": token,
          "Event-Key": "get-predefined-data"
        }
        const { data } = await axios.get(AMS_MODEL_PATH, {
          params: {
            id:assetId.value
          },
          headers: payloadHeader,
          data: {}
        });

        const { result } = data;
        frequencyOptions.value = result.frequencies;
        frequency.value = result.frequencies[0].id;
        maintenanceOptions.value = result.maintenanceType;
        maintenance.value = result.maintenanceType[0].id;
        serviceDescriptionOptions.value = result.frequencies[0].serviceDescription;
        serviceDescription.value = result.frequencies[0].serviceDescription;
        recurrence.value = parseInt(maintenance.value) === 3 ? props.start : "";
        handlerOptions.value = result.personnel;
        handler.value = result.personnel[0].id;
        serviceResultOptions.value = result.serviceResult;
        serviceResult.value = result.serviceResult[0].id;
        assetStatusOptions.value = result.assetStatus;
        assetStatus.value = result.assetStatus[0].id;

      } catch (error) {
        console.log(error);
      }
    }
    await getPredefinedData();
    handleFrequencyRule(props.start);

  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleCloseAddScheduleForm);
  });
</script>

<template>
  <section class = "modal-section">
    <div class = "flex justify-center h-screen mb-20">
      <div class = "modal-relative w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-4/5 p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
        <div class='bg-white dark:bg-slate-800/90 rounded-md mb-10'>
          <div class='float-right text-2xl text-center'>
            <button
              class='text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-center text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl'
              type = "button"
              @click = "closeCallBack"
            >
              <i class = "fa fa-times"></i>
            </button>
            
          </div>
          <div class = "border-b-2 dark:border-gray-600/50 py-6 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-2xl text-sky-500 uppercase p-8">Add&nbsp;Work&nbsp;Order</span>
          </div>
          <div class = "px-8 mt-8 font-bold text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-2xl uppercase">
            <span class=''>Schedule</span>
          </div>
          <div class = "flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Service Type</span>&nbsp;<span class="text-red-500">*</span>
              </div>
              <Select
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "maintenanceOptions"
                v-model = "maintenance"
                @change = "handleServiceType"
              />
            </div>
            
          </div>
          <div class = "flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Title</span>&nbsp;<span class="text-red-500">*</span>
              </div>
              <Input
                v-model = "woTitle"
                inputType = "text"
                inputPlaceholder = "Work order title"
                inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                :isDisabled = "false"
              />
            </div>
          </div>
          <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Start</span>&nbsp;<span class="text-red-500">*</span>
              </div>
              <Input
                v-model = "startDate"
                inputType = "date"
                inputPlaceholder = "Start date of Service"
                inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                :isDisabled = "false"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">End</span>
              </div>
              <Input
                v-model = "endDate"
                :inputValue = "endDate?.value"
                inputType = "date"
                inputPlaceholder = "Start date of Service"
                inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                :isDisabled = "false"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Frequency</span>&nbsp;<span class="text-red-500">*</span>
              </div>
              <Select
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white disabled:border-gray-600 disabled:hover:cursor-not-allowed"
                :options = "frequencyOptions"
                v-model = "frequency"
                :onChangeEvent = "handleFrequency"
                :isDisabled = "maintenance === 6"
              />
            </div>
          </div>
          <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Recurrence Start</span>
              </div>
              <Input
                v-model = "recurrence"
                inputType = "date"
                inputPlaceholder = "Start date of Service"
                inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                :isDisabled = "false"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">End of Event Recurrence</span>
              </div>
              <Input
                v-model = "endOfRecurrence"
                :inputValue = "endOfRecurrence?.value"
                inputType = "date"
                inputPlaceholder = "End of Recurrence"
                inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                :isDisabled = "false"
              />
            </div>
          </div>
          
          <div class = "text-sm dark:text-white flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8" v-if = "maintenance === 3">
            <div class=' dark:bg-slate-700 bg-slate-100 p-4 rounded justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Service Description</span>
              </div>
              <div v-if = "serviceDescriptionOptions.length > 0" :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }' class ="overflow-y-scroll h-64 mt-6">
                <label v-for="serviceDescriptionOption in serviceDescriptionOptions" :key="serviceDescriptionOption.id" class = "flex items-start p-2">
                  <input type="checkbox" class = "h-5" :value="serviceDescriptionOption.id" v-model = "selectedDescriptions">&nbsp;
                  <span>{{ serviceDescriptionOption.description }}</span><br/>
                </label>
              </div>
              <div v-else = "serviceDescriptionOptions.length > 0" :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }' class ="mb-6">
                <span class="font-medium italic dark:text-yellow-400">No Service Description available for this frequency</span>
              </div>
            </div>
          </div>
          <div class = "text-sm dark:text-white flex grid grid-cols-1 gap-4" v-else-if = "maintenance === 6">
            <div class = "px-8 mt-8 font-bold text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-2xl uppercase">
              <span class=''>Service Log</span>
            </div>
            <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Handled by</span>&nbsp;<span class="text-red-500">*</span>
                </div>
                <Select
                  selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                  :options = "handlerOptions"
                  v-model = "handler"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Performed by</span>&nbsp;<span class="text-red-500">*</span>
                </div>
                <Input
                  v-model = "performedBy"
                  inputType = "text"
                  inputPlaceholder = "Performed the service"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Supervised by</span>&nbsp;<span class="text-red-500">*</span>
                </div>
                <Input
                  v-model = "supervisedBy"
                  inputType = "text"
                  inputPlaceholder = "Supervised the service"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
              </div>
            </div>
            <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Service Purchase Order</span>
                </div>
                <Input
                  v-model = "purchaseOrder"
                  inputType = "text"
                  inputPlaceholder = "Purchase Order Number"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Incurred Cost</span>
                </div>
                <Input
                  v-model = "incurredCost"
                  inputType = "text"
                  inputPlaceholder = "Service Cost"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
              </div>
              
            </div>
            <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Equipment used</span>
                </div>
                <Input
                  v-model = "equipmentUsed"
                  inputType = "text"
                  inputPlaceholder = "Equipment used during Service"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
                
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Service Status</span>&nbsp;<span class="text-red-500">*</span>
                </div>
                <Select
                  v-model = "serviceResult"
                  selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                  :options = "serviceResultOptions"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Asset Status</span>&nbsp;<span class="text-red-500">*</span>
                </div>
                <Select
                  v-model = "assetStatus"
                  selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                  :options = "assetStatusOptions"
                />
              </div>
              
            </div>
            <div class='flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Service Description</span>&nbsp;<span class="text-red-500">*</span>
                </div>
                <TextArea
                textAreaClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
                v-model = "serviceDescriptionText"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Attach Service Documents</span>
                </div>
                <Input
                  ref = "serviceDocInput"
                  @change = "handleFileAttachment"
                  inputType = "file"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                  inputPlaceholder = "Attach Documents"

                />
                <ul class = "px-4 mt-2 text-left" v-if = "serviceDocs.length > 0">
                  <li class = "font-bold dark:text-gray-300 text-gray-800 list-disc" v-for = "serviceDoc in serviceDocs">
                    <i class = "fa-solid fa-file-pdf">&nbsp;</i>{{ serviceDoc.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class = "text-center">
            <span class = "font-normal text-xs dark:text-yellow-400 text-slate-800">NOTE: </span>
          </div>

          <div className = "flex justify-end m-4 p-6">
            <Button
              buttonText = "Submit"
              buttonClass = "font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
              buttonType = "button"
              :onClickEvent = "handleSaveSchedule"
              iconSetting = "fa-solid fa-paper-plane"
              :isDisabled = "false"
              buttonTitle = "Save Schedule"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .modal-section {
    display: block;
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    overflow-x: hidden;
    animation: fadeIn 0.5s ease 0s 1 normal none running;
  }

  .modal-relative {
    position: relative;
    text-align: center;
  }

  @keyframes fadeIn {
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
</style>