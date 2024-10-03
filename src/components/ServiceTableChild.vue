<script setup>
  import { ref, onMounted, onBeforeMount } from "vue";
  import Button from "./Button.vue";
  import AddServiceLog from "./AddServiceLog.vue";
  import ServiceLogInfo from "./ServiceLogInfo.vue";
  import ChangeLog from "./ChangeLog.vue";
  import axios, { AxiosError } from 'axios';
  import { authToken, AMS_MODEL_PATH } from '../assets/global.js'
  import { useToast } from "vue-toastification";
  const toast = useToast();

  const props = defineProps({
    serviceDetails: {
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
    }
  });
  const emit = defineEmits(['recall-work-order', "hide-child-state"]);
  const maintenance = defineModel("maintenance");
  const serviceDescriptionText = ref("");
  const handler = ref(0);
  const handlerOptions = ref([]);
  const applyToEveryService = ref(false);
  const toArray = ref([props.serviceDetails]);
  const displayUpdateForm = ref(false);
  const assetStatus = ref(0);
  const assetStatusOptions = ref([]);
  const performedBy = ref("");
  const supervisedBy = ref({
    name: "",
    mail: "",
    account: ""
  });
  const childDiv = ref(null);
  const purchaseOrder = ref("");
  const incurredCost = ref("");
  const equipmentUsed = ref("");
  const serviceDocs = ref([]);
  const testingStartDate = ref("");
  const testingEndDate = ref("");
  const isGoingToEditService = ref(false);

  const handleFileAttachment = (filesAttached) => {
    serviceDocs.value = [];
    serviceDocs.value.push(...filesAttached);
  }

  const handleEditEvent = () => {
    isGoingToEditService.value = !isGoingToEditService.value;
  }

  const handleSaveService = async () => {
    try {
      const formData = new FormData();
      const serviceId = props.serviceDetails.id;
      formData.append("serviceId", serviceId);
      formData.append("handledBy", handler.value);
      formData.append("applyToEveryService", applyToEveryService.value);
      if (!handler.value) {
        throw new Error ("Handled By is required.");
      }
      formData.append("performedBy", performedBy.value);
      if (!performedBy.value) {
        throw new Error ("Performed By is required.");
      }
      if (!supervisedBy.value) {
        throw new Error ("Supervised By is required.");
      }
      formData.append("supervisedBy", JSON.stringify(supervisedBy.value));
      
      if (!assetStatus.value) {
        throw new Error ("Asset status is required.");
      }
      formData.append("assetStatus", assetStatus.value);
      if (!serviceDescriptionText.value) {
        throw new Error ("Service Description textbox is required");
      }
      formData.append("remarks", serviceDescriptionText.value);
      purchaseOrder.value && formData.append("purchaseOrder", purchaseOrder.value);
      incurredCost.value && formData.append("incurredCost", incurredCost.value);
      equipmentUsed.value && formData.append("equipmentUsed", equipmentUsed.value);
      testingStartDate.value && formData.append("testingStartDate", testingStartDate.value);
      testingEndDate.value && formData.append("testingEndDate", testingEndDate.value);
      serviceDocs.value.map((file, index) => {
        formData.append(`docs${ index }`, file);
      });
      const auth = await authToken();
      const { data } = await axios.post(
        AMS_MODEL_PATH,
        formData,
        {
          headers: {
            "Content-Type":"multipart/form-data",
            "Event-Key":"put-service-log",
            "Authorization": auth
          }
        }
      );
      const { success, message } = data;
      if (success) {
        emit("recall-work-order");
        toast.success(message, {
          icon: "fa-solid fa-circle-check",
        });
        emit("hide-child-state");
      } else {
        toast.warning(message, {
          icon: "fa-solid fa-triangle-exclamation",
        });
        return false;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message, status } = error.response;
        if (status === 503) {
          location.reload()
        } else {
          toast.warning(message, {
            icon: "fa-solid fa-triangle-exclamation",
          });
          window.location.href = `index.php?page=${ status }`;
        }
      } else {
        toast.warning(error.message, {
          icon: "fa-solid fa-triangle-exclamation",
        });
      }
      
      return false;
    }
    
  }

  onMounted(() => {
    childDiv.value.scrollIntoView({ behavior: 'smooth' });
  });

  onBeforeMount(async () => {
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
            id:props.assetId
          },
          headers: payloadHeader,
          data: {}
        });

        const { result } = data;
        handlerOptions.value = result.personnel;
        handler.value = result.personnel[0].id;
        assetStatusOptions.value = result.assetStatus;
        assetStatus.value = result.assetStatus[0].id;
        displayUpdateForm.value = true;
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
    await getPredefinedData();
  })

</script>
<template>
  <tr :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "p-2 w-full bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700" ref = "childDiv">
    <td colspan="4">
      <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "border-x-2 dark:border-x dark:border-slate-800 mx-7 bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit" v-if = "serviceDetails.serviceResult === 'Open'">
        <AddServiceLog
          v-model:maintenanceType = "maintenance"
          v-model:handler = "handler"
          v-model:purchaseOrder = "purchaseOrder"
          v-model:incurredCost = "incurredCost"
          v-model:performedBy = "performedBy"
          v-model:supervisedBy = "supervisedBy"
          v-model:testingStartDate = "testingStartDate"
          v-model:testingEndDate = "testingEndDate"
          v-model:equipmentUsed = "equipmentUsed"
          v-model:assetStatus = "assetStatus"
          v-model:serviceDescriptionText = "serviceDescriptionText"
          v-model:applyToEveryService = "applyToEveryService"
          @attach-file = "handleFileAttachment"
          :handlerOptions = "handlerOptions"
          :assetStatusOptions = "assetStatusOptions"
          :serviceDocs = "serviceDocs"
          :serviceCount = "props.serviceCount"
        />
        <div className = "flex justify-end m-4 p-6">
          <Button
            buttonText = "Submit"
            buttonClass = "font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50"
            buttonType = "button"
            :onClickEvent = "handleSaveService"
            iconSetting = "fa-solid fa-paper-plane"
            :isDisabled = "false"
            buttonTitle = "Save Schedule"
          />
        </div>
        <div class = "p-2 mt-1 flex grid grid-cols-1">
          <div class='overflow-x-auto h-auto w-full justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
            <div class = "px-4 mt-4 dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
              <span class = "">Change Log</span>
            </div>
            <ChangeLog :id = "toArray[0].id" formOrigin = "__SERVICE_" />
          </div>
        </div>
      </div>
      <div :style= "{ animation: '1s ease 0s 1 normal none running fadeIn' }" class = "border-x-2 dark:border-x dark:border-slate-800 md:mx-7 lg:mx-7 xl:mx-7 2xl:mx-7  bg-white dark:bg-slate-800 flex grid grid-cols-1 min-h-fit p-4" v-else-if = "serviceDetails.serviceResult === 'Closed'">
        <div class = "dark:text-slate-400 text-center font-bold text-2xl uppercase my-2 mb-4">
          <span class = "">Service Log</span>
        </div>
        
        <ServiceLogInfo
          @workOrderRecall = "getWorkOrder"
          v-if = "displayUpdateForm"
          :serviceData = "toArray"
          :handlerOptions = "handlerOptions"
          :assetStatusOptions = "assetStatusOptions"
          :id = "toArray[0].id"
          formOrigin = "__SERVICE_"
        />
        
      </div>
    </td>
  </tr>
</template>