<script setup>
  import { ref, onMounted } from "vue";
  const props = defineProps({
    base64: {
      type: String,
      required: true
    }
  });
  import VuePdfEmbed, { useVuePdfEmbed } from 'vue-pdf-embed'
  const fileDiv = ref(null);
  const page = ref(1);
  const pageCount = ref(null);
  const annotation = ref(true);

  import 'vue-pdf-embed/dist/style/index.css'
  // import 'vue-pdf-embed/dist/style/annotationLayer.css'
  import 'vue-pdf-embed/dist/style/textLayer.css'
  const { doc } = useVuePdfEmbed({
    source: props.base64
  });

  const handleDocumentLoad = ({ numPages }) => {
    pageCount.value = numPages;
  }
  onMounted(() => {
    setTimeout(() => {
      fileDiv.value.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  });
</script>
<template>
  <div class = "flex justify-center items-center">
    <button
    class = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl" 
    :disabled="page <= 1"
    @click="page--">
      <i class = "fa-solid fa-angles-left"></i>
    </button>
    <span class = "dark:text-sky-400 font-bold mx-4">
      {{ page }} / {{ pageCount }}
    </span>
    

    <button
    class = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl" 
    :disabled="page >= pageCount"
    @click="page++"
    ><i class = "fa-solid fa-angles-right"></i></button>
  </div>
  <div class = "mt-2 w-full" :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }' ref = "fileDiv">
    <VuePdfEmbed :textLayer="annotation" class = "w-full pointer-events-none select-none" :page = "page" @loaded="handleDocumentLoad" :source="props.base64" />
  </div>
  <div class = "flex justify-center items-center">
    <button
    class = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl" 
    :disabled="page <= 1"
    @click="page--">
      <i class = "fa-solid fa-angles-left"></i>
    </button>
    <span class = "dark:text-sky-400 font-bold mx-4">
      {{ page }} / {{ pageCount }}
    </span>
    

    <button
    class = "text-2xl text-center rounded-full hover:bg-slate-200 p-2 w-8 text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs font-normal uppercase dark:bg-slate-800 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition ease-in-out delay-50 hover:shadow-2xl" 
    :disabled="page >= pageCount"
    @click="page++"
    ><i class = "fa-solid fa-angles-right"></i></button>
  </div>
</template>
<style scoped> 
.textLayer .some-css-class {
  cursor: default; /* or another fallback style */
  background-image: none !important; /* Prevents missing image reference */
}
</style>