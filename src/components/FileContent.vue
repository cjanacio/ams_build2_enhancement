<script setup>
  const props = defineProps({
    base64: {
      type: String,
      required: true
    }
  });
  import VuePdfEmbed from 'vue-pdf-embed'

  // import 'vue-pdf-embed/dist/style/index.css'
  // import 'vue-pdf-embed/dist/style/annotationLayer.css'
  // import 'vue-pdf-embed/dist/style/textLayer.css'

</script>
<template>
  <!-- <iframe class = "mt-2 h-screen w-full" :src = "props.base64" :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'></iframe> -->
  <div class = "" :style='{ animation: "1s ease 0s 1 normal none running fadeIn" }'>
    <VuePdfEmbed :source="props.base64" />
  </div>

</template>