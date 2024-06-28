<script setup>
  import { ref } from "vue";
  import { useToast } from "vue-toastification";
  import TextArea from "./TextArea.vue";
  import Select from "./Select.vue";
  import Input from "./Input.vue";
  const toast = useToast();

  const handler = defineModel('handler');
  const purchaseOrder = defineModel('purchaseOrder');
  const incurredCost = defineModel('incurredCost');
  const performedBy = defineModel('performedBy');
  const supervisedBy = defineModel('supervisedBy');
  const testingStartDate = defineModel('testingStartDate');
  const testingEndDate = defineModel('testingEndDate');
  const equipmentUsed = defineModel('equipmentUsed');
  const serviceResult = defineModel('serviceResult');
  const assetStatus = defineModel('assetStatus');
  const serviceDescriptionText = defineModel('serviceDescriptionText');
  const serviceDocInput = ref(null);
  const applyToEveryService = ref(false);
  const emits = defineEmits(['attach-file']);
  const props = defineProps({
    serviceResultOptions: {
      type: Array,
      required: true
    },
    handlerOptions: {
      type: Array,
      required: true
    },
    assetStatusOptions: {
      type: Array,
      required: true
    },
    serviceDocs: {
      type: Array,
      required: true
    },
    maintenanceType: {
      type: Number,
      required: true
    },
    serviceCount: {
      type: Number,
      required: true
    }
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let validFiles = true;
    files.map(file => {
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
    emits('attach-file', files);
  };
</script>

<template>
  <div class=''>
    <div class = "px-8 mt-8 font-bold text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-2xl uppercase">
      <span class=''>Service Log</span>
    </div>
    <div class = "px-8 mt-8 font-normal text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-xs uppercase">
      <span class="text-red-500">* required field</span>
    </div>
    <label class = "uppercase px-8 mt-8" v-if = "serviceCount > 1">
      <input type="checkbox" class = "mt-8" v-model = "applyToEveryService">&nbsp;
      <span>Apply to all Services in this PM</span><br/>
    </label>
    <label ></label>
    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mb-2">
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
    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mb-2">
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
    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mb-2">
      <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Actual Start Date</span>
        </div>
        <Input
          v-model = "testingStartDate"
          inputType = "date"
          inputPlaceholder = "Actual Start Testing Date"
          inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          :isDisabled = "false"
        />
      </div>
      <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Actual End Date</span>
        </div>
        <Input
          v-model = "testingEndDate"
          inputType = "date"
          inputPlaceholder = "Actual End Testing Date"
          inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          :isDisabled = "false"
        />
      </div>
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
    </div>

    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mb-2">
      
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
          <span class = "">Attach Service Documents</span>&nbsp;<span class="text-red-500">*</span>
        </div>
        <Input
          ref = "serviceDocInput"
          @change = "handleFileChange"
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
</template>