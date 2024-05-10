<script setup>
  import axios from 'axios';
  import { PARAM_URL } from "./assets/global.js";
  import { ref, onMounted } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import Header from './components/Header.vue';
  import AddSchedule from './components/AddSchedule.vue';

  /* START STATE MANAGEMENT */
  const parentClass = ref("bg-rob-mall-2 bg-white bg-no-repeat bg-local bg-right bg-contain dark:bg-slate-800/70 dark:bg-rob-mall-5 w-full");
  const pagePath = ref("Asset Monitoring System");
  const userName = ref("Sample User Name");
  const animationStyle = ref("animation: 1s ease 0s 1 normal none running fadeIn;");
  const activePath = thePath => thePath.substring(thePath.lastIndexOf('#') + 1);
  const path = window.location.href;
  const assetId = ref(0);
  const calendarPlugins = ref([
    dayGridPlugin,
    interactionPlugin
  ]);
  const displayAddSchedule = ref(false);
  const initialView = ref('dayGridMonth');
  const events = ref([]);
  const calendarOptions = ref({
    events: events,
    plugins: calendarPlugins,
    initialView: initialView,
    themeSystem: 'bootstrap5',
    selectable: true,
    eventDisplay: 'auto',
    eventOverlap: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridDay,dayGridWeek,dayGridMonth'
    },
    datesSet: (dateInfo) => {
      console.log('Start date:', dateInfo.startStr); // Start date of the displayed range
      console.log('End date:', dateInfo.endStr); // End date of the displayed range
    },
    
    selectMirror: true,
    dayMaxEvents: true,
    select: (response) => {
      console.log(response.start);
      handleAddScheduleForm()
    },
    eventClick: () => { alert("Event Clicked!") }
  });

  /* END STATE MANAGEMENT */

  /* START METHODS MANAGEMENT */
  const handleAddScheduleForm = () => {
    displayAddSchedule.value = !displayAddSchedule.value
  }

  const handleCloseAddScheduleForm = () => {
    displayAddSchedule.value = false;
    document.body.style.overflowY = "visible";
  }

  const calendarInit = async () => {
    try {
      const { data } = await axios.get('http://localhost:5173/src/assets/events.json');
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  }
  /* END METHODS MANAGEMENT */

  /* START VUE METHODS MANAGEMENT */
  onMounted(async () => {
    events.value = await calendarInit();
    window.location.assign(`${ PARAM_URL }#1&1&1`);  /* DEV PURPOSES */
    const params = activePath(path);
    const split = params.split("&"); 
    assetId.value = split[0];
  });
  /* END VUE METHODS MANAGEMENT */
  
</script>

<template>
  <AddSchedule
    v-if = "displayAddSchedule"
    :closeCallBack = "handleCloseAddScheduleForm"
  />
  <section class = "h-dvh sm:h-dvh md:h-dvh lg:h-screen xl:h-screen 2xl:h-screen" :style="animationStyle">
    <div class = "px-0 sm:px-0 md:px-5 lg:px-6 py-0">
      <div class = "flex h-full g-6 text-gray-800 flex-wrap">
        <Header 
          :parentClass = "parentClass"
          :pagePath = "pagePath"
          :userName = "userName"
        />
      </div>
      <section class = "bg-rob-mall bg-white bg-fixed bg-no-repeat bg-left dark:bg-no-bg dark:bg-slate-700/50 min-w-screen min-h-screen w-full">
        <div class = "mb-20" :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }">
          <div class = "p-4 bg-fixed bg-no-repeat dark:bg-no-bg flex grid grid-cols-1 justify-center w-full">
            <div class = "rounded shadow-2xl shadow-gray-800 p-4 bg-white dark:bg-slate-800/70 dark:text-white">
              <FullCalendar ref = "serviceCalendar" :options = "calendarOptions">
                
              </FullCalendar>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
