<script setup>
  import FileListing from "./FileListing.vue";
  const props = defineProps({
    serviceData: {
      type: Array,
      required: true
    },
    workOrderRecall: {
      type: Function,
      required: false
    }
  });

</script>

<template>
  <div class=''>
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
            {{ props.serviceData[0].incurredCost }}
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
        <div class='px-4 w-full rounded border border-slate-300 dark:border-slate-600 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
          <div class = "mt-4 dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
            <span class = "">Service Documents</span>
          </div>
          <FileListing :serviceDocs = "props.serviceData[0].files"/>
        </div>
      </div>
  </div>
</template>