<script setup>
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import { authToken, AMS_MODEL_PATH } from '../assets/global.js'
import FileListing from "./FileListing.vue";
import ChangeLogRow from './ChangeLogRow.vue';
const emits = defineEmits([
  "close-callback"
]);
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

const assetInfo = ref([]);
const changeLogs = ref([]);
const handleCloseForm = (e) => {
  if (e.key === "Escape") {
    emits('close-callback');
    document.body.style.overflowY = "auto"
  }
}

const getAssetInfo = async () => {
  try {
    const id = props.id;
    const auth = await authToken();
    const { data } = await axios.get(AMS_MODEL_PATH, {
      params: {
        id:id
      },
      headers: {
        "Content-Type":"application/json",
        "Event-Key": "get-asset-info",
        "Authorization": auth
      },
      data: {}
    });

    const { success, asset } = data;
    if (success) {
      assetInfo.value = asset[0];
      changeLogs.value = assetInfo.changeLog.result.value;
    }
    
  } catch (error) {

  }
}

onMounted(async () => {
  window.addEventListener("keyup", handleCloseForm);
  document.body.style.overflowY = "hidden";
  await getAssetInfo();
});

onUnmounted(() => {
  window.removeEventListener("keyup", handleCloseForm);
});

</script>
<template>
  <section class = "modal-section">
    <div class = "flex justify-center h-screen mb-20">
      <div class = "modal-relative w-full sm:w-full md:w-11/12 lg:w-11/12 xl:w-11/12 2xl:w-11/12 p-2 sm:p-2 md:p-4 lg:p-6 xl:p-6 2xl:p-6">
        <div class='bg-white dark:bg-slate-800/90 rounded-md mb-10'>
          <div class='flex justify-end align-end text-2xl text-center mr-2'>
            <div class = "mt-1">
              <button
                class='text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-center text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl'
                type = "button"
                @click = "emits('close-callback')"
              >
                <i class = "fa fa-times"></i>
              </button>
            </div>
          </div>
          <div class = "flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start 2xl:justify-start mb-2 border-b-2 dark:border-gray-600/50 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-sky-500 uppercase pb-8 px-8">Asset&nbsp;General&nbsp;info</span>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Building</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.buildingId }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Asset Type</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.assetType }}</span>
              </div>
            </div>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Asset Code</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.assetName }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Area Served</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.areaServed }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Area Installed</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.areaInstalled }}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class = "flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start 2xl:justify-start mt-2 mb-2 border-t-2 border-b-2 dark:border-gray-600/50 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-sky-500 uppercase p-8 px-8">purchase&nbsp;info</span>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Supplier</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.supplier }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Purchase Order No.</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.purchaseNumber }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Purchase Cost</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.purchaseCost }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Purchase Date</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.purchaseDate }}</span>
              </div>
            </div>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Warranty Validity Date From</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.warrantyFrom }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Warranty Validity Date To</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.warrantyTo }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Date Installed</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.dateInstalled }}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class = "flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start 2xl:justify-start mt-2 mb-2 border-t-2 border-b-2 dark:border-gray-600/50 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-sky-500 uppercase p-8 px-8">asset&nbsp;details</span>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Brand</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.brand }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Serial Number</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.serialNumber }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Capacity</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.capacity }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Model / Type</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.model }}</span>
              </div>
            </div>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Volts</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.volts }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Full Load Ampere (FLA)</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.amps }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Phase (PH)</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.phase }}</span>
              </div>
            </div>
          </div>
          <div class = "p-1 flex grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Revolution per minute (RPM)</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.rpm }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Hertz (HZ)</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.hertz }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Power Factor (PF)</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.powerFactor }}</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div class = "flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start 2xl:justify-start mt-2 mb-2 border-t-2 border-b-2 dark:border-gray-600/50 font-bold md:text-left lg:text-left xl:text-left 2xl:text-left">
            <span class = "text-4xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-sky-500 uppercase p-8 px-8">others</span>
          </div>
          <div class = "p-1 flex grid grid-cols-1 gap-2 px-2">
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Other Details</span>&nbsp;<span class="dark:text-slate-200 font-bold"><br/>{{ assetInfo.assetDescription }}</span>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Attachments</span>
                <FileListing :serviceDocs = "assetInfo.files"/>
              </div>
            </div>
            <div class='rounded border border-slate-300 dark:border-slate-600 p-4 justify-center items-center' :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
              <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                <span class = "">Change History Log</span>&nbsp;
                <table class="mt-2 table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class = "rounded-t-lg border-b border-gray-700 shadow-lg text-xs text-gray-600 uppercase bg-green-300 dark:bg-slate-700/70 dark:text-green-400">
                    <tr class = "rounded">
                      <th scope="col" class="p-5"></th>
                      <th scope="col" class="p-5">Requested By</th>
                      <th scope="col" class="p-5">Date Requested</th>
                      <th scope="col" class="p-5">Remarks</th>
                      <th scope="col" class="p-5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ChangeLogRow
                      v-if = "changeLogs.length > 0"
                      :changeLog = "changeLogs"
                      v-for = "changeLog in changeLogs"
                      @get-change-log = "getAssetInfo"
                    />
                    <tr class = "p-2 bg-slate-100 border-b dark:bg-slate-700/70 dark:border-slate-700" v-else>
                      <td colspan="5" class = "px-4 py-4 uppercase font-bold text-center">No Change Log record found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!--  -->
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