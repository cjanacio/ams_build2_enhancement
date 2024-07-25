<script setup>
  import axios, { AxiosError } from 'axios';
  import { useToast } from "vue-toastification";
  import { AMS_MODEL_PATH } from '../assets/global.js'
  import { ref, onMounted, onUnmounted } from 'vue';
  import ServiceTable from "./ServiceTable.vue";
  import ServiceLogInfo from "./ServiceLogInfo.vue";

  const toast = useToast();

  const props = defineProps({
    closeCallBack: {
      type: Function,
      required: true
    },
    id: {
      type: Number,
      required: true,
    }
  });

  const asset = ref("");
  const aId = ref(0);
  const postedBy = ref("");
  const datePosted = ref("");
  const end = ref("");
  const start = ref("");
  const color = ref("");
  const maintenance = ref("");
  const maintenanceId = ref(0);
  const eventTitle = ref("");
  const frequencySched = ref("");
  const serviceDescription = ref([]);
  const equipment = ref("");
  const assetStatus = ref("");
  const assetStatusColor = ref("");
  const handleUnmountComponent = (e) => {
    if (e.key === "Escape") {
      props.closeCallBack();
      document.body.style.overflowY = "auto"
    }
  }

  const getWorkOrder = async () => {
    try {
      const id = props.id;
      const payloadBody = {
        id:id
      };
      const payloadHeader = {
        "Content-Type":"application/json",
        "Event-Key":"get-work-order-info",
      }

      const { data } = await axios.get(AMS_MODEL_PATH, {
        params: payloadBody,
        headers: payloadHeader,
        data: {}
      });

      const { success, result } = data;
      if (!success) {
        throw new Error ("Something went wrong in displaying Work Order details");
      }
      const {
        assetId,
        title,
        startDate,
        endDate,
        createdBy,
        dateCreated,
        assetType,
        maintenanceType,
        maintenanceTypeId,
        frequencySchedule,
        legend,
        details,
        equipmentUsed,
        statusDescription,
        statusDescriptionColor
      } = result.workOrder;

      eventTitle.value = title;
      start.value = startDate;
      end.value = endDate;
      postedBy.value = createdBy;
      datePosted.value = dateCreated;
      asset.value = assetType;
      maintenance.value = maintenanceType;
      frequencySched.value = frequencySchedule;
      color.value = legend;
      serviceDescription.value = details;
      maintenanceId.value = maintenanceTypeId;
      equipment.value = equipmentUsed;
      aId.value = assetId;
      assetStatus.value = statusDescription;
      assetStatusColor.value = statusDescriptionColor;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message, status } = error.response;
        if (status === 503) {
          location.reload();
        } else {
          window.location.href = `index.php?page=${ status }`;
          toast.warning(message, {
            icon: "fa-solid fa-triangle-exclamation",
          });
        }
        
      } else {
        toast.warning(error.message, {
          icon: "fa-solid fa-triangle-exclamation",
        });
      }
    }
    
  }

  onMounted(async () => {
    window.addEventListener("keyup", handleUnmountComponent);
    document.body.style.overflowY = "hidden";
    
    await getWorkOrder();
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleUnmountComponent);
  });

</script>

<template>
  <section class = "modal-section">
    <div class = "flex justify-center h-screen mb-20">
      <div class = "modal-relative w-full sm:w-full md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-4/5 p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
        <div class='bg-white dark:bg-slate-800/90 rounded-md mb-10'>
          <div class='float-right text-2xl text-center'>
            <button
              class='text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl'
              type = "button"
              @click = "closeCallBack"
            >
              <i class = "fa fa-times"></i>
            </button>
            
          </div>
          <div class = "mb-2 border-b-2 dark:border-gray-600/50 py-6 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-2xl text-sky-500 uppercase p-8 ">Work&nbsp;Order</span>
          </div>
          <div class = "flex grid grid-cols-1 gap-1 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
                <span class = "">Work Order Overall Asset Status</span>
              </div>
              <div class = "text-left">
                <span class="dark:text-slate-200 font-bold text-left uppercase " :style='{ color: assetStatusColor }'>
                  {{ assetStatus }}
                </span>
              </div>
            </div>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-1 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Service Type:</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ maintenance }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Asset Type:</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ asset }}</span>
              </div>
            </div>
          </div>
          <div class = "flex grid grid-cols-1 gap-1 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Title:</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ eventTitle }}</span>
              </div>
              
            </div>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-1 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Start:</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ start }}</span>
              </div>
              
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">End:&nbsp;</span><span class = "dark:text-slate-200 font-bold"><br/>{{ end }}</span>
              </div>
              
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">
                  Frequency:
                </span>&nbsp;
                <span :style="{color: color}" class="font-bold">
                  <br/>{{ frequencySched }}
                </span>
              </div>
              
            </div>
          </div>
          
          <div class = "text-sm dark:text-white flex grid grid-cols-1 gap-1 px-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-2 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div v-if = "maintenanceId === 3">
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Services:</span>
                </div>
                <ServiceTable
                  :serviceData = "serviceDescription"
                  :assetId = "aId"
                  :workOrderId = "props.id"
                  :workOrderRecall = "getWorkOrder"
                />
              </div>
              <div v-else-if = "maintenanceId === 6">
                <div class = "dark:text-slate-400 text-center font-bold text-sm uppercase my-2 mb-4">
                  <span class = "">Service Log</span>
                </div>
                <ServiceLogInfo
                  :assetId = "aId"
                  :serviceData = "serviceDescription"
                />
                
              </div>
            </div>
          </div>

          <div className = "flex justify-end m-4 p-6"></div>
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