<script setup>
  import axios, { AxiosError } from "axios";
  import { ref, onMounted } from "vue";
  import FileListing from "./FileListing.vue";
  import ChangeLog from "./ChangeLog.vue";
  import Button from "./Button.vue";
  import UpdateServiceLog from "./UpdateServiceLog.vue";
  const activePath = thePath => thePath.substring(thePath.lastIndexOf('#') + 1);
  const path = window.location.href;
  const params = activePath(path);
  const split = params.split("&"); 
  const props = defineProps({
    serviceData: {
      type: Array,
      required: true
    },
    handlerOptions: {
      type: Array,
      required: false
    },
    assetStatusOptions: {
      type: Array,
      required: false
    },
    id: {
      type: Number,
      required: true
    },
    maintenance: {
      type: Number,
      required: false
    }
  });
  const isGoingToEditService = ref(false);
  const handlerOptions = ref(props.handlerOptions);
  const assetStatusOptions = ref(props.assetStatusOptions);
  const emits = defineEmits([
    "workOrderRecall"
  ]);

  const handleEditEvent = () => {
    isGoingToEditService.value = !isGoingToEditService.value;
  }

  onMounted(() => {
    
  })

</script>

<template>
  <div class = "mt-1 flex grid grid-cols-1 gap-1">
    <div class = "float-right">
      <Button
        buttonText = ""
        buttonClass = "mx-1 float-right text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
        buttonType = "button"
        :onClickEvent = "handleEditEvent"
        :iconSetting = "isGoingToEditService === true ? 'fa-solid fa-times' : 'fa-solid fa-pen-to-square'"
        :isDisabled = "false"
        :buttonTitle = "isGoingToEditService === true ? 'Cancel Editing of Service Log' : 'Edit Service Log'"
      />
      <Button
        v-if = "props.maintenance && props.maintenance === 6"
        buttonText = ""
        buttonClass = "mx-1 float-right text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl"
        buttonType = "button"
        :onClickEvent = "handleEditEvent"
        iconSetting = "fa-solid fa-check"
        :isDisabled = "false"
        buttonTitle = "Mark Service Log as Complete/Closed"
      />
    </div>
    <div class='' v-if = "!isGoingToEditService">
      <div class = "mt-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-1">
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Handled by</span>
            </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].personnel }}
            </span>
          </div>
        </div>
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Performed by</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].performedBy }}
            </span>
          </div>
          
        </div>
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Supervised by</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].supervisedBy.name }}
            </span>
          </div>
        </div>
      </div>
      <div class = "mt-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-1">
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Service Purchase Order</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].purchaseOrder }}
            </span>
          </div>
        </div>
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Incurred Cost</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ 
                props.serviceData[0].incurredCost
                .replace(/\D/g, "")
                .replace(/([0-9])([0-9]{2})$/, '$1.$2')  
                .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",")
              }}
            </span>
          </div>
        </div>
        
      </div>
      <div class = "mt-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-1">
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Actual Start Date</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].testStartDate }}
            </span>
          </div>
        </div>
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Actual End Date</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].testEndDate }}
            </span>
          </div>
        </div>
      </div>
        
      <div class = "mt-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-1">
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Equipment used</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].equipment }}
            </span>
          </div>
        </div>
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Service Status</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].serviceResult }}
            </span>
          </div>
        </div>
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Asset Status</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].detailsStatus }}
            </span>
          </div>
        </div>
        
      </div>
      <div class = "mt-1 flex grid grid-cols-1 gap-1">
        <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase">
            <span class = "">Other Details</span>
          </div>
          <div class = "text-left">
            <span class="dark:text-slate-200 font-bold text-left">
              {{ props.serviceData[0].remarks }}
            </span>
          </div>
        </div>
      </div>
      <div class = "mt-1 flex grid grid-cols-1">
        <div class='h-auto px-4 w-full rounded border border-slate-300 dark:border-slate-600 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "mt-4 dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
            <span class = "">Service Documents</span>
          </div>
          <FileListing :serviceDocs = "props.serviceData[0].files"/>
        </div>
      </div>
      <div class = "mt-1 flex grid grid-cols-1">
        <div class='overflow-x-auto h-auto w-full rounded border border-slate-300 dark:border-slate-600 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "px-4 mt-4 dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
            <span class = "">Change Log</span>
          </div>
          <ChangeLog :id = "props.id" />
        </div>
      </div>
    </div>
    <UpdateServiceLog
      :handlerOptions = "handlerOptions"
      :assetStatusOptions = "assetStatusOptions"
      :serviceData = "props.serviceData"
      v-if = "isGoingToEditService"
      @reset-form = "handleEditEvent"
      @work-order-recall = "emits('workOrderRecall')"
    />
    
  </div>
  
</template>