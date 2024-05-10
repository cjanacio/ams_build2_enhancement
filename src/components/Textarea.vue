<script setup>
  const model = defineModel();
  defineProps({
    textAreaClass: {
      type: String,
      required: true
    }
  })
</script>
<template>
  <textarea v-model = "model" :class = "textAreaClass"></textarea>
</template>