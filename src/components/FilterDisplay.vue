<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import Input from './Input.vue';
  import Select from './Select.vue';
  const props = defineProps({
    predefined: {
      type: Object,
      required: true
    },
    viewType: {
      type: String,
      required: true
    }
  });
  const selectAll = ref([{
    id: 0,
    description: "Select One"
  }]);
  const filterFrom = defineModel("filterFrom");
  const filterTo = defineModel("filterTo");
  const filterFrequency = defineModel("filterFrequency");
  const filterType = defineModel("filterType");
  const filterStatus = defineModel("filterStatus");
  const maintenanceOptions = ref([...selectAll.value, ...props.predefined.maintenanceType]);
  const serviceResultOptions = ref([...selectAll.value, ...props.predefined.serviceResult]);
  const frequencyOptions = ref([...selectAll.value, ...props.predefined.frequencies]);
  
  const emits = defineEmits([
    'close-callback',
    'handle-filter-submission'
  ]);

  const handleUnmountComponent = (e) => {
    if (e.key === "Escape") {
      emits('close-callback')
      document.body.style.overflowY = "auto"
    }
  }

  onMounted(async () => {
    window.addEventListener("keyup", handleUnmountComponent);
    document.body.style.overflowY = "hidden";
    if (filterStatus.value === 0 || isNaN(filterStatus.value)) filterStatus.value = serviceResultOptions.value[0].id;
    if (filterType.value === 0 || isNaN(filterType.value)) filterType.value =  maintenanceOptions.value[0].id;
    if (filterFrequency.value === 0 || isNaN(filterFrequency.value)) filterFrequency.value =  frequencyOptions.value[0].id;
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleUnmountComponent);
  });
</script>

<template>
  <section class = "modal-section">
    <div class = "flex justify-center h-screen mb-20">
      <div class = "modal-relative w-full sm:w-full md:w-3/4 lg:w-2/4 xl:w-2/4 2xl:w-2/4 p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
        <div class='bg-white dark:bg-slate-800/90 rounded-md mb-10'>
          <div class='flex justify-end align-end text-2xl text-center mr-2'>
            <div class = "mt-1">
              <button
                class='text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl'
                type = "button"
                @click = "emits('close-callback')"
              >
                <i class = "fa fa-times"></i>
              </button>
            </div>
          </div>
          <div class = "flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start 2xl:justify-start mb-2 border-b-2 dark:border-gray-600/50 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-sky-500 uppercase pb-8 px-8">Filter&nbsp;Table</span>
          </div>
          <div class = "p-5">
            <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 w-full mb-2" v-if = "viewType === 'Table'">
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Filter From</span>
                </div>
                <Input
                  v-model = "filterFrom"
                  inputType = "date"
                  inputPlaceholder = "Filter Date Starting Point"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Filter To</span>
                </div>
                <Input
                  v-model = "filterTo"
                  inputType = "date"
                  inputPlaceholder = "Filter Date End Point"
                  inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  :isDisabled = "false"
                />
              </div>
            </div>
            <div class = "flex grid grid-cols-1 gap-4 w-full mb-2">
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Service Type</span>
                </div>
                <Select
                  selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                  :options = "maintenanceOptions"
                  v-model = "filterType"
                />
              </div>
            </div>
            <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 w-full mb-2">
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Frequency</span>
                </div>
                <Select
                  selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white disabled:border-gray-600 disabled:hover:cursor-not-allowed"
                  :options = "frequencyOptions"
                  v-model = "filterFrequency"
                  :isDisabled = "filterType === 6"
                />
              </div>
              <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "">Service Status</span>
                </div>
                <Select
                  v-model = "filterStatus"
                  selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                  :options = "serviceResultOptions"
                />
              </div>
            </div>
          </div>
          
          <div class = "flex justify-end m-4 p-6">
            <button
              class='font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 border border-green-500 rounded dark:bg-slate-800 text-green-500 hover:bg-green-500 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50'
              type = "button"
              title = "Submit"
              @click = "emits('handle-filter-submission')"
            >
              <i class = "fa-solid fa-paper-plane"></i>&nbsp;Submit Filter Option
            </button>
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