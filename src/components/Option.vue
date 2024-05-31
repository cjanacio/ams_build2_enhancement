<script setup>
  const props = defineProps({
    optionText: {
      type: String,
      required: true
    },
    optionValue: {
      type: Number,
      required: true
    },
    setSelected: {
      type: Boolean,
      required: true
    }
  });
</script>
<template>
  <option :value="props.optionValue" :selected = "props.setSelected">{{ props.optionText }}</option>
</template>