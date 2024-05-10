<script setup>
  import { ref, onMounted } from 'vue';
  import Button from "./Button.vue";
  import Input from "./Input.vue";
  import Select from "./Select.vue";
  import TextArea from "./Textarea.vue";

  const startDate = ref("");
  const endDate = ref("");
  const frequency = ref(0);
  const frequencyOptions = ref([]);
  const reccurencePattern = ref(0);
  const recurrenceOptions = ref([{
    id: 0,
    description: "Select recurrence pattern"
  }]);
  const serviceDescription = ref("");

  const props = defineProps({
    closeCallBack: {
      type: Function,
      required: true
    }
  });
  
  const handleSaveSchedule = async () => {
    alert("Test");
  }

  const handleFrequency = async () => {

  }

  const handleReccurencePattern = async () => {
    alert("Recucre");
  }
  
  onMounted(async () => {
    document.body.style.overflowY = "hidden";
    document.body.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        props.closeCallBack();
        document.body.style.overflowY = "auto";
      }
    });
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
            <span class = "text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-2xl text-sky-500 uppercase p-8">Add&nbsp;Service&nbsp;Schedule</span>
          </div>
          <div class = "px-8 mt-8 font-bold text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-2xl uppercase">
            <span class=''>Service Schedule</span>
          </div>
          <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Start</span>
              </div>
              <Input
                v-model = "startDate"
                :inputValue = "startDate?.value"
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
                <span class = "">Frequency</span>
              </div>
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
          </div>
          <div class = "flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Reccurence Pattern</span>
              </div>
              <Select
                :onChangeEvent="handleReccurencePattern"
                :selectId = "reccurencePattern"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "recurrenceOptions"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Service Description</span>
              </div>
              <TextArea
                :textAreaModel = "serviceDescription"
                textAreaClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
              />
            </div>
          </div>
          <div class = "px-8 mt-8 font-bold text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-2xl uppercase">
            <span class=''>Service Log</span><br/><span class = 'normal-case text-xs italic font-light dark:text-yellow-400 '>This form is OPTIONAL. Can be filled out after the Service</span>
          </div>
          <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Group to handle</span>
              </div>
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Performed by</span>
              </div>
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Supervised by</span>
              </div>
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
          </div>
          <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Service Purchase Order</span>
              </div>
              <Input
                v-model = "startDate"
                :inputValue = "startDate?.value"
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
                v-model = "endDate"
                :inputValue = "endDate?.value"
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
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Service Status</span>
              </div>
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Asset Status</span>
              </div>
              <Select
                :onChangeEvent="handleFrequency"
                :selectId = "frequency"
                selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
                :options = "frequencyOptions"
              />
            </div>
            
          </div>
          <div class = "flex grid grid-cols-1 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
            <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Other Details</span>
              </div>
              <TextArea
                :textAreaModel = "serviceDescription"
                textAreaClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white h-32"
              />
            </div>
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