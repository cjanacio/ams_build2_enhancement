<script setup>

  import axios from 'axios';
  import tippy, { followCursor } from 'tippy.js';
  import 'tippy.js/dist/tippy.css';
  import { authToken, __ENV__, PARAM_URL, AMS_MODEL_PATH } from "./assets/global.js";
  import { ref, onMounted, onUnmounted } from 'vue';
  import FullCalendar from '@fullcalendar/vue3';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import Header from './components/Header.vue';
  import AddSchedule from './components/AddSchedule.vue';
  import ScheduleInfo from './components/ScheduleInfo.vue';
  import Button from './components/Button.vue';
  import TableScheduleView from './components/TableScheduleView.vue';
  import FilterDisplay from './components/FilterDisplay.vue';
  __ENV__ === "DEV" && window.location.assign(`${ PARAM_URL }#1&1&1`);  /* DEV PURPOSES */

  /* START STATE MANAGEMENT */
  localStorage.setItem("view-type-local", localStorage.getItem("view-type-local") !== null && localStorage.getItem("view-type-local") !== '' ? localStorage.getItem("view-type-local") : "Calendar");
  const parentClass = ref("bg-rob-mall-2 bg-white bg-no-repeat bg-local bg-right bg-contain dark:bg-slate-800/70 dark:bg-rob-mall-5 w-full");
  const pagePath = ref("Asset Monitoring System");
  const userName = ref("Sample User Name");
  const animationStyle = ref("animation: 1s ease 0s 1 normal none running fadeIn;");
  const activePath = thePath => thePath.substring(thePath.lastIndexOf('#') + 1);
  const path = window.location.href;
  const params = activePath(path);
  const split = params.split("&"); 
  const assetId = ref(split[0]);
  const workOrderId = ref(0);
  const periodFrom = ref(""); //for adding service schedule
  const periodTo = ref(""); //for adding service schedule
  const dumpResult = ref([]);
  const displayTableFilter = ref(false);
  const displayCalendarFilter = ref(false);
  const filterFrom = ref(""); //for table/calendar
  const filterTo = ref(""); //for table/calendar
  const filterFrequency = ref("");
  const filterType = ref("");
  const filterStatus = ref("");
  const predefined = ref([]);
  const viewType = ref(localStorage.getItem("view-type-local"));
  const identifyView = ref(viewType.value === 'Table' ? displayTableFilter : displayCalendarFilter);
  const isAllDisplayed = ref(false);
  const paginationStatus = ref("Loading more record.. Please wait..");
  const page = ref(0);
  const debounceTimer = ref(1000);
  const invokeScrolling = ref();
  const scheduleLegend = ref([]);

  const calendarPlugins = ref([
    dayGridPlugin,
    interactionPlugin
  ]);

  const displayAddSchedule = ref(false);
  const displaySchedule = ref(false);
  const initialView = ref('dayGridMonth');
  const events = ref([]);
  const calendarOptions = ref({
    events: events,
    plugins: calendarPlugins,
    initialView: initialView,
    themeSystem: 'bootstrap5',
    selectable: true,
    eventDisplay: 'block',
    eventOverlap: false,
    eventDidMount: (info) => {
      const tooltipContent = `
      <div class="text-gray-800 dark:text-gray-100 relative p-1.5">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold uppercase">${ info.event.title }</span><br/>
          
        </div>
        <p class="text-xs"><span class = "font-bold">Asset Type</span>: ${ info.event.extendedProps.assetType }</p>
        <p class="text-xs"><span class = "font-bold">Service Type</span>: ${ info.event.extendedProps.maintenanceType }</p>
        <p class="text-xs"><span class = "font-bold">Created by</span>: ${ info.event.extendedProps.createdBy }</p>
        <p class="text-xs"><span class = "font-bold">Date Created</span>: ${ info.event.extendedProps.dateCreated }</p>
      </div>
      `;

      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      let toolTipTheme = "lightMode";
      if (isDarkMode) {
        toolTipTheme = "darkMode";
      }
      // Initialize Tippy.js tooltip
      tippy(info.el, {
        content: tooltipContent,
        allowHTML: true,
        delay: 0,
        followCursor: true,
        theme: toolTipTheme,
        plugins: [followCursor]
      });
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridDay,dayGridWeek,dayGridMonth'
    },
    datesSet: async (dateInfo) => { //setting up the default date from and date to
      const setStart = new Date(dateInfo.startStr);
      const setEnd = new Date(dateInfo.endStr);
      const start = `${
        setStart.getFullYear() + "/" + String(setStart.getMonth() + 1).padStart(2, '0') + "/" + String(setStart.getDate()).padStart(2, '0')
      }`;
      const end = `${
        setEnd.getFullYear() + "/" + String(setEnd.getMonth() + 1).padStart(2, '0') + "/" + String((setEnd.getDate() - 1)).padStart(2, '0')
      }`;
      filterFrom.value = start;
      filterTo.value = end;
      events.value = await calendarInit(0);
    },
    selectMirror: true,
    dayMaxEvents: true,
    eventOrder: true,
    select: (response) => { //This is for adding PM schedule
      const setStart = new Date(response.start);
      let setEnd = new Date(response.end);
      setEnd.setDate(setEnd.getDate() - 1);
      const start = `${
        setStart.getFullYear() + "-" + String(setStart.getMonth() + 1).padStart(2, '0') + "-" + String(setStart.getDate()).padStart(2, '0')
      }`;
      const end = `${
        setEnd.getFullYear() + "-" + String(setEnd.getMonth() + 1).padStart(2, '0') + "-" + String(setEnd.getDate()).padStart(2, '0')
      }`;
      periodFrom.value = start;
      periodTo.value = end;
      handleAddScheduleForm();
    },
    eventClick: (info) => {
      handleScheduleInfoForm(info.event.id);
    }
  });
  
  const handleViewType = async () => {
    displayTableFilter.value = false;
    displayCalendarFilter.value = false;
    localStorage.setItem("view-type-local", viewType.value);
    
    if (viewType.value === "Table") dumpResult.value = await calendarInit(0); 
  }

  /* END STATE MANAGEMENT */

  /* START METHODS MANAGEMENT */
  const handleFilterModal = () => {
    // displayTableFilter.value = false;
    // displayCalendarFilter.value = false;
    if (viewType.value === "Table") {
      const currentDate = new Date();
      const from = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      const to = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const formattedStart = `${
        from.getFullYear()}-${String(from.getMonth()).padStart(2, '0')}-${String(from.getDate()).padStart(2, '0')
      }`;
      const formattedEnd = `${
        to.getFullYear()}-${String(to.getMonth() + 1).padStart(2, '0')}-${String(to.getDate()).padStart(2, '0')
      }`;
      filterFrom.value = formattedStart;
      filterTo.value = formattedEnd;
      displayTableFilter.value = true;
      identifyView.value = displayTableFilter.value;
    } else if (viewType.value === "Calendar") {
      displayCalendarFilter.value = true;
      identifyView.value = displayCalendarFilter.value;
    }
  }

  const handleScheduleInfoForm = async (id) => {
    workOrderId.value = id;
    displaySchedule.value = !displaySchedule.value;
    document.body.style.overflowY = "visible";
    events.value = await calendarInit(0);
  }

  const handleAddScheduleForm = () => {
    displayAddSchedule.value = !displayAddSchedule.value;
  }

  const handleCloseAddScheduleForm = async () => {
    displayAddSchedule.value = false;
    document.body.style.overflowY = "visible";
    events.value = await calendarInit(0);
    dumpResult.value = events.value;
  }

  const calendarInit = async (x) => { //x = page
    try {
      x = parseInt(x);
      page.value = viewType.value === "Table"
      ? x === 0
        ? x += 1
        : page.value
      : false;

      const id = assetId.value;
      const dateFrom = filterFrom.value;
      const dateTo = filterTo.value;
      const type = parseInt(filterType.value);
      const frequency = parseInt(filterFrequency.value);
      const serviceResult = parseInt(filterStatus.value);
      const view = viewType.value;
      const payLoad = {
        id:id,
        dateFrom:dateFrom,
        dateTo:dateTo,
        viewType:view
      }
      if (type !== 0 && !isNaN(type)) payLoad.type = type;
      if (frequency !== 0 && !isNaN(frequency)) payLoad.frequency = frequency;
      if (serviceResult !== 0 && !isNaN(serviceResult)) payLoad.serviceResult = serviceResult;

      if (page.value !== false) payLoad.page = page.value;
      const { data } = await axios.get(AMS_MODEL_PATH, {
        params: payLoad,
        headers: {
          "Content-Type":"application/json",
          "Event-Key":"get-work-order-schedule"
        },
        data: {}
      });
      filterType.value = type;
      filterFrequency.value = frequency;
      filterStatus.value = serviceResult;
      const { schedule, result, isAll } = data;
      paginationStatus.value = isAll === true ? "All schedules are displayed" : "Loading more record.. Please wait..";
      isAllDisplayed.value = isAll === true ? true : false;
      scheduleLegend.value = schedule;
      return result;
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

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
          id:assetId.value
        },
        headers: payloadHeader,
        data: {}
      });
      const { result } = data;
      predefined.value = result;
    } catch (error) {
      console.log(error);
    }
  }
  /* END METHODS MANAGEMENT */

  /* START VUE METHODS MANAGEMENT */
  const handleScroll = async () => {
    
    if (localStorage.getItem("view-type-local") === "Table") {
      const bottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 1);
      if (bottom) {
        if (isAllDisplayed.value !== true) {
          clearTimeout(invokeScrolling.value);
          invokeScrolling.value = setTimeout(async () => {
            const holder = await calendarInit(page.value);
            dumpResult.value = [...dumpResult.value, ...holder];
          }, debounceTimer.value);
        }
      }
    }
  };
  
  const handleCloseFilter = () => {
    if (viewType.value === "Table") {
      displayTableFilter.value = false;
      identifyView.value = displayTableFilter.value;
    } else if (viewType.value === "Calendar") {
      displayCalendarFilter.value = false;
      identifyView.value = displayCalendarFilter.value;
    }
    document.body.style.overflowY = "visible";
  }

  const handleFilter = async () => {
    viewType.value === 'Table'
    ? dumpResult.value = await calendarInit(0)
    : events.value = await calendarInit(0)
  }

  const customScrollBehavior = (x, y) => {
    window.scroll({
      top: x,
      left: y,
      behavior: 'smooth'
    });
  }

  onMounted(async () => {
    customScrollBehavior(230, 100);
    window.addEventListener('scroll', handleScroll);
    await getPredefinedData();
    if (localStorage.getItem("view-type-local") === "Table") {
      const currentDate = new Date();
      const from = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

      // Get the last day of the current month
      const to = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const formattedStart = `${
        from.getFullYear()}/${String(from.getMonth()).padStart(2, '0')}/${String(from.getDate()).padStart(2, '0')
      }`;
      const formattedEnd = `${
        to.getFullYear()}/${String(to.getMonth() + 1).padStart(2, '0')}/${String(to.getDate()).padStart(2, '0')
      }`;
      filterFrom.value = formattedStart;
      filterTo.value = formattedEnd;
      dumpResult.value = await calendarInit(page.value);
    }
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  /* END VUE METHODS MANAGEMENT */
  
</script>

<template>
  <ScheduleInfo
    v-if = "displaySchedule"
    :closeCallBack = "handleScheduleInfoForm"
    :id = "parseInt(workOrderId)"
  />
  <AddSchedule
    v-if = "displayAddSchedule"
    @close-callback = "handleCloseAddScheduleForm"
    :start = "periodFrom"
    :end = "periodTo"
    :id = "parseInt(assetId)"
    :predefined = "predefined"
  />
  <!-- <FilterCalendar
    @close-callback = "handleCloseCalendarFilter"
    v-model:
  /> -->
  <FilterDisplay
    v-if = "identifyView"
    @close-callback = "handleCloseFilter"
    @handle-filter-submission = "handleFilter"
    :predefined = "predefined"
    :viewType="viewType"
    v-model:filterFrom = "filterFrom"
    v-model:filterTo = "filterTo"
    v-model:filterFrequency = "filterFrequency"
    v-model:filterType = "filterType"
    v-model:filterStatus = "filterStatus"
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
      <section class = "bg-rob-mall bg-white bg-fixed bg-no-repeat bg-left dark:bg-no-bg dark:bg-slate-700/50 min-w-screen min-h-dvh w-full">
        <div class = "mb-20" :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }">
          <div class = "lg:p-4 xl:p-4 2xl:p-4 bg-fixed bg-no-repeat dark:bg-no-bg flex grid grid-cols-1 justify-center w-full">
            <div class = "rounded shadow-2xl shadow-gray-800 p-4 bg-white dark:bg-slate-800/70 dark:text-white">
              <div class = "flex grid grid-cols-1 mb-4">
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "font-bold">Asset Frequency Schedule: </span>
                </div>
                <ul class = "ml-4 list-disc list-inside dark:text-slate-400 text-sm">
                  <li v-if = "scheduleLegend.length > 0" v-for="schedule in scheduleLegend">
                    {{ schedule.description }}: 
                    <span v-if = "schedule.scheduled">
                      <i class = "text-green-400 fa-solid fa-circle-check"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class = "flex grid grid-cols-1 mb-4">
                <div class = "dark:text-slate-400 text-left font-normal text-sm uppercase mb-2">
                  <span class = "font-bold">View Type: </span>
                </div>
                <select v-model = "viewType" @change = "handleViewType" class = 'text-sm rounded shadow-lg shadow-slate-500 dark:shadow-none dark:bg-slate-900/70 dark:text-white dark:border-sky-500 w-full sm:w-full md:w-64 lg:w-64 xl:w-64 2xl:w-64 p-2 border border-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:text-white'>
                  <option>Calendar</option>
                  <option>Table</option>
                </select>
              </div>
              <div v-if = "viewType === 'Calendar'" :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }">
                <Button
                  buttonText = "Filter Calendar"
                  buttonClass = "font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full border border-sky-400 sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 rounded dark:bg-slate-800 text-sky-400 hover:bg-sky-400 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50 mb-4"
                  buttonType = "button"
                  :onClickEvent = "handleFilterModal"
                  iconSetting = "fa-solid fa-sliders"
                  :isDisabled = "false"
                  buttonTitle = "Modify the Calendar's feed to your needs"
                />
                <FullCalendar ref = "serviceCalendar" :options = "calendarOptions">
                  <template v-slot:eventContent='arg'>
                    <div class = "px-1.5 hover:cursor-pointer font-medium text-ellipsis overflow-hidden">
                      {{ arg.event.title }}
                    </div>
                  </template>
                </FullCalendar>
              </div>
              <div class = "mb-20" v-else-if = "viewType === 'Table'" :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }">
                
                <Button
                  buttonText = "Filter Table"
                  buttonClass = "mr-2 font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full border border-sky-400 sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 rounded dark:bg-slate-800 text-sky-400 hover:bg-sky-400 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50 mb-4"
                  buttonType = "button"
                  :onClickEvent = "handleFilterModal"
                  iconSetting = "fa-solid fa-sliders"
                  :isDisabled = "false"
                  buttonTitle = "Modify the Table's feed to your needs"
                />
                
                <Button
                  buttonText = "Add Schedule"
                  buttonClass = "font-bold uppercase text-xs shadow-lg shadow-slate-500 dark:shadow-none w-full border border-green-400 sm:w-44 md:w-44 lg:w-44 xl:w-44 2xl:w-44 rounded dark:bg-slate-800 text-green-400 hover:bg-green-400 hover:text-white hover:cursor-pointer bg-white p-2 transition ease-in-out delay-50 mb-4"
                  buttonType = "button"
                  :onClickEvent = "handleAddScheduleForm"
                  iconSetting = "fa-solid fa-sliders"
                  :isDisabled = "false"
                  buttonTitle = "Modify the Table's feed to your needs"
                />
                <div class="mx-auto">
                  <div class="overflow-x-auto">
                    <TableScheduleView
                      :response = "dumpResult"
                      @display-info = "handleScheduleInfoForm"
                    />
                  </div>
                </div>
                <div class = "w-full text-center sm:text-center md:text-left lg:text-left xl:text-left 2xl:text-left italic mt-4 text-xs uppercase">
                  <span class = "dark:text-slate-200 text-slate-800">
                    <i v-if = "isAllDisplayed" class = "text-green-400 fa-regular fa-circle-check">&nbsp;</i>{{ paginationStatus }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style>
.tippy-box[data-theme~='lightMode'] {
  background-color: #f8fafc;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  
}
.tippy-box[data-theme~='darkMode'] {
  background-color: #334155;
}

@media (prefers-color-scheme: dark) {
  /* Custom dark mode styles for FullCalendar popover */
  .fc-popover {
    background-color: #1e293b !important; /* slate-800 */
    border: 1px solid #334155 !important; /* slate-700 */
    color: #d1d5db !important; /* gray-300 */
    border-radius: 0.5rem !important; /* rounded-lg */
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; /* shadow-lg */
  }

  .fc-popover .fc-header {
    background-color: #334155 !important; /* slate-700 */
    color: #ffffff !important; /* white */
    padding: 0.75rem !important; /* p-3 */
    border-bottom: 1px solid #475569 !important; /* border-slate-600 */
  }

  .fc-popover .fc-body {
    padding: 0.75rem; /* p-3 */
  }

  .fc-popover .fc-footer {
    background-color: #334155 !important; /* slate-700 */
    padding: 0.75rem; /* p-3 */
    border-top: 1px solid #475569 !important; /* border-slate-600 */
  }

  .fc-popover .fc-title {
    font-weight: 700; /* font-bold */
    font-size: 1.125rem; /* text-lg */
  }
}

</style>