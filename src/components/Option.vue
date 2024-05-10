<script setup>
  defineProps({
    optionText: {
      type: String,
      required: true
    },
    optionValue: {
      type: String,
      required: true
    },
  });
</script>
<template>
  <option :value="optionValue">{{ optionText }}</option>
</template>