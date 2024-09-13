<script setup>
  import { ref, onMounted } from "vue";
  import { useToast } from "vue-toastification";
  import InputTextArea from "./InputTextArea.vue";
  import Select from "./Select.vue";
  import Input from "./Input.vue";
  import Button from "./Button.vue";
  import axios, { AxiosError } from "axios";
  import { AMS_MODEL_PATH, GLOBAL_PATH2, authToken } from '../assets/global.js'
  const toast = useToast();
  const props = defineProps({
    serviceData: {
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
    }
  });
  const emits = defineEmits([
    "reset-form"
  ])
  const handler = ref(props.serviceData[0].personnelId);
  const handlerOptions = ref(props.handlerOptions);
  
  const logId = ref(props.serviceData[0].id)
  const assetStatus = ref(props.serviceData[0].detailsStatusId);
  const assetStatusOptions = ref(props.assetStatusOptions);
  const performedBy = ref(props.serviceData[0].performedBy);
  const supervisedBy = ref(props.serviceData[0].supervisedBy);
  const supervisedByPass = ref(props.serviceData[0].supervisedBy.name)
  const purchaseOrder = ref(props.serviceData[0].purchaseOrder);
  const incurredCost = ref(props.serviceData[0].incurredCost);
  const equipmentUsed = ref(props.serviceData[0].equipment);
  const serviceDocs = ref(props.serviceData[0].files);
  const testingStartDate = ref("");
  const testingEndDate = ref("");
  const serviceDescriptionText = ref(props.serviceData[0].remarks)
  const showAutoCorrect = ref(false);
  const serviceDocInput = ref(null);
  const reasonForEdit = ref("");
  const loadingMsg = ref("");
  const activeDirectory = ref([]);
  const debounceTimer = 1000; //1 second
  const invokeTyping = ref();
  const fileAttachment = ref([]);

  const dateFormatting = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const handleAutoCorrectClick = (dataset) => {
    const {
      name,
      mail,
      account
    } = dataset;
    supervisedByPass.value = name;
    supervisedBy.value = {
      name: name,
      mail: mail,
      account: account
    };
    showAutoCorrect.value = false;
  }

  const inputAmountFormat = (value) => {
    incurredCost.value = value
      .replace(/\D/g, "")
      .replace(/([0-9])([0-9]{2})$/, '$1.$2')  
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
    ;
  }
  const defaultAmountFormat = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/([0-9])([0-9]{2})$/, '$1.$2')  
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
    ;
  }

  const getActiveDirectoryList = async (user) => {
    showAutoCorrect.value = true;
    try {
      const { data } = await axios.get(
        GLOBAL_PATH2,
        {
          params: {
            un: user
          },
          headers: {
            "Content-Type":"application/json;charset=utf-8",
            "Event-Key":"autocorrect-filter",
          },
          data: {}
        },
        
      );
      const { success, ad } = data
      if (success === true) {
        if (ad.length === 0) {
          loadingMsg.value = "No results found."
        } else {
          activeDirectory.value = ad;
        }
      } else {
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status } = error.response;
        if (status === 503) {
          location.reload();
        } else {
          window.location.href = `index.php?page=${ status }`;
        }
      }
    }
  }

  const handleSupervisedKeyUp = (event) => {
    const key = event;
    if (key.which <= 90 && key.which >= 48 || key.which === 8 || key.which === 46) {
      if (key.target.value) {
        loadingMsg.value = "Searching.. Please wait..";
        showAutoCorrect.value = true;
        activeDirectory.value.length = 0;
        clearTimeout(invokeTyping.value);
        invokeTyping.value = setTimeout(getActiveDirectoryList, debounceTimer, key.target.value);
      } else {
        showAutoCorrect.value = false;
      }
    } else if (key.which === 27) {
      showAutoCorrect.value = false;
    }
  }
  const handleFileAttachment = (files) => {
    fileAttachment.value = [];
    fileAttachment.value = [...files];
  }
  const handleFileChange = (event) => {
    try {
      const files = Array.from(event.target.files);
      const limit = 5; // file count limit
      const fileCount = [...files, ...serviceDocs.value];
      if (fileCount.length > limit) {
        throw new Error("Work Order Service Log maximum Service Documents is only up to 5 PDF files.");
      }
      files.forEach(file => {
        const fileLimit = 5242880;
        if (file.type !== "application/pdf" && file.type !== "image/jpeg") {
          throw new Error("You can only attach PDF or JPEG files")
        }
        if (file.size > fileLimit) {
          throw new Error("Maximum allowable file size for uploads is 5 megabytes (5 MB) per file. Please try again.");
        }
      });
      handleFileAttachment(files);
    } catch (error) {
      toast.warning(error.message, {
        icon: "fa-solid fa-triangle-exclamation",
      });
      serviceDocInput.value.clearInputComponent();
      return false;
    }
    
  };

  const submitChanges = async () => {
    try {
      let isChanged = false;
      const formData = new FormData();
      if (handler.value !== props.serviceData[0].personnelId) {
        if (!handler.value) {
          throw new Error ("Handled By is required.");
        }
        formData.append("handler", handler.value);
        isChanged = true;
      }
      if (performedBy.value !== props.serviceData[0].performedBy) {
        if (!performedBy.value) {
          throw new Error ("Performed By is required.");
        }
        formData.append("performedBy", performedBy.value);
        isChanged = true;
      }
      if (supervisedByPass.value !== props.serviceData[0].supervisedBy.name) {
        if (!supervisedByPass.value) {
          throw new Error ("Supervised By is required.");
        }
        formData.append("supervisedBy", supervisedByPass.value);
        isChanged = true;
      }
      if (purchaseOrder.value !== props.serviceData[0].purchaseOrder) {
        if (!purchaseOrder.value) {
          throw new Error ("You cannot leave Service Purchase Order blank.");
        }
        formData.append("purchaseOrder", purchaseOrder.value);
        isChanged = true;
      }
      if (incurredCost.value.replaceAll(",", "") !== props.serviceData[0].incurredCost) {
        if (!incurredCost.value) {
          throw new Error ("You cannot leave Incurred Cost blank.");
        }
        formData.append("incurredCost", incurredCost.value);
        isChanged = true;
      }
      if (equipmentUsed.value !== props.serviceData[0].equipment) {
        if (!equipmentUsed.value) {
          throw new Error ("You cannot leave Equipment Used blank.");
        }
        formData.append("equipmentUsed", equipmentUsed.value);
        isChanged = true;
      }
      if (testingStartDate.value !== dateFormatting(props.serviceData[0].testStartDate)) {
        if (!testingStartDate.value) {
          throw new Error ("You cannot leave Actual Start Date blank.");
        }
        formData.append("testingStartDate", testingStartDate.value);
        isChanged = true;
      }
      if (testingEndDate.value !== dateFormatting(props.serviceData[0].testEndDate)) {
        if (!testingEndDate.value) {
          throw new Error ("You cannot leave Actual End Date blank.");
        }
        formData.append("testingEndDate", testingEndDate.value);
        isChanged = true;
      }
      if (assetStatus.value !== props.serviceData[0].detailsStatusId) {
        if (!assetStatus.value) {
          throw new Error ("Asset status is required.");
        }
        formData.append("assetStatus", assetStatus.value);
        isChanged = true;
      }
      if (serviceDescriptionText.value !== props.serviceData[0].remarks) {
        if (!serviceDescriptionText.value) {
          throw new Error ("You cannot leave Service Description textbox blank.");
        }
        formData.append("serviceDescriptionText", serviceDescriptionText.value);
        isChanged = true;
      }
      if (!reasonForEdit.value) {
        throw new Error ("Please indicate the reason for edit request.");
      }

      if (fileAttachment.value.length > 0) {
        isChanged = true;
        fileAttachment.value.map((file, index) => {
          formData.append(`docs${ index }`, file);
        });
      }

      formData.append("remarks", reasonForEdit.value);
      formData.append("id", logId.value);
      if (isChanged === false) return false;
      const auth = await authToken();
      const { data } = await axios.post(
        AMS_MODEL_PATH,
        formData,
        {
          headers: {
            "Content-Type":"multipart/form-data",
            "Event-Key":"put-request-service-log",
            "Authorization": auth
          }
        }
      )
      const { success, message } = data;
      if (!success) {
        toast.warning(message, {
          icon: "fa-solid fa-triangle-exclamation",
        });
        return false;
      }
      emits("reset-form");
      toast.success(message, {
        icon: "fa-solid fa-circle-check",
      });
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
    }
  }

  const iniDeleteFile = async (targetFile) => {
    alert(targetFile);
  }

  onMounted(() => {
    testingStartDate.value = dateFormatting(props.serviceData[0].testStartDate);
    testingEndDate.value = dateFormatting(props.serviceData[0].testEndDate);
    incurredCost.value = defaultAmountFormat(incurredCost.value);
  });
</script>

<template>
  <div class=''>
    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mb-2">
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

    </div>
    <div class = "flex grid grid-cols-1 gap-4 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 mb-2">
      <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
          <span class = "">Supervised by</span>&nbsp;<span class="text-red-500">*</span>
        </div>
        <span class="italic text-xs">(Select employee in autosuggest)</span>
        <Input
          v-model = "supervisedByPass"
          inputType = "text"
          inputPlaceholder = "Supervised the service"
          inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          :isDisabled = "false"
          @keyup = "handleSupervisedKeyUp"
        />
        <div
          class = "flex justify-start"
        >
          <ul class = "mt-2 rounded-lg absolute overflow-y-scroll max-h-[32rem] w-11/12 md:w-1/2 lg:w-3/4 xl:w-3/4 2xl:w-3/4 block rounded border-dotted border border-sky-300 p-2 focus:outline-sky-400 dark:focus:outline-gray-800 text-sm bg-white dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:border-none" v-if = "showAutoCorrect">
            <li class = "w-full text-left px-2 py-2 text-md text-gray-400" v-if = "activeDirectory.length === 0"><i>{{ loadingMsg }}</i></li>
            <li 
              v-if = "activeDirectory.length > 0"
              @click = "handleAutoCorrectClick(empoyee)" 
              v-for = "empoyee in activeDirectory" 
              class = "w-full text-left py-2 px-3 hover:bg-gray-200 dark:hover:bg-slate-800 dark:hover:text-yellow-400 text-md hover:cursor-pointer rounded"
              :style = "{ 'animation': 'fadeIn ease 1s' }"
            > 
              {{ empoyee.name }} 
              <ul>
                <li class = "px-2 py-2 text-sm text-gray-400">
                  <i class = "p-2">{{ empoyee.account }}</i><br/>
                  <i class = "p-2">{{ empoyee.mail }}</i>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
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
          @input = "inputAmountFormat($event.target.value)"
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
        <InputTextArea
        textAreaClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
        v-model = "serviceDescriptionText"
        />
        <div class = "flex justify-end items-end mb-4">
          <span class = "uppercase dark:text-slate-400 text-xs justify-end font-medium">{{ serviceDescriptionText.length }} / 1000</span>
        </div>
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
        <table class = "dark:bg-slate-900/50 w-full uppercase mt-10" v-if = "serviceDocs.length > 0">
          <thead class = "bg-green-400 dark:bg-slate-900/70  text-center">
            <th class ="dark:text-green-400 text-slate-100 p-4">SERVICE DOCUMENTS ATTACHED</th>
          </thead>
          <tbody>
            <tr class = "px-2 py-4" v-for = "serviceDoc in serviceDocs">
              <td class = "text-center sm:justify-center md:text-left lg:text-left xl:text-left 2xl:text-left p-3">
                <button
                  type = "button"
                  class = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-red-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
                  @click = "iniDeleteFile(serviceDoc.name)"
                >
                  <i class = "fa-solid fa-trash"></i>
                </button>
                &nbsp;
                <i class = "fa-solid fa-file-pdf"></i>&nbsp;{{ serviceDoc.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Reason for Edit Request</span>&nbsp;<span class="text-red-500">*</span>
        </div>
        <InputTextArea
        textAreaClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
        v-model = "reasonForEdit"
        />
        <div class = "flex justify-end items-end mb-4">
          <span class = "uppercase dark:text-slate-400 text-xs justify-end font-medium">{{ reasonForEdit.length }} / 500</span>
        </div>
      </div>
    </div>
    <div className = "flex justify-end m-4 p-6">
      <Button
        buttonText = "Submit"
        buttonClass = "font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
        buttonType = "button"
        :onClickEvent = "submitChanges"
        iconSetting = "fa-solid fa-paper-plane"
        :isDisabled = "false"
        buttonTitle = "Save Schedule"
      />
    </div>
  </div>
</template>