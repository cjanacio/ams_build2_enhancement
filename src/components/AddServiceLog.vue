<script setup>
  import Button from "./Button.vue";
  import TextArea from "./TextArea.vue";
  import Select from "./Select.vue";
  import Input from "./Input.vue";
</script>

<template>
  <div class=''>
    <div class = "px-8 mt-8 font-bold text-sky-500 md:text-left lg:text-left xl:text-left 2xl:text-left text-2xl uppercase">
      <span class=''>Service Log</span>
    </div>
    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
      <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Handled by</span>
        </div>
        <Select
          selectClass="text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white"
          :options = "groupToHandleOptions"
          v-model = "groupToHandle"
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
    <div class = "flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 px-4 mt-4 sm:px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
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
          v-model = "equipmentUsed"
          inputType = "text"
          inputPlaceholder = "Equipment used during Service"
          inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          :isDisabled = "false"
        />
      </div>
      <div class='justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
        <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
          <span class = "">Actual Testing Date</span>
        </div>
        <Input
          v-model = "equipmentUsed"
          inputType = "date"
          inputPlaceholder = "Equipment used during Service"
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
          v-model = "incurredCost"
          inputType = "text"
          inputPlaceholder = "Service Cost"
          inputClass = "text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          :isDisabled = "false"
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
        buttonTitle = "Save Service"
      />
    </div>
  </div>
</template>