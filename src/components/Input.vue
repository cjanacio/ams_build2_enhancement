<script setup>
  import { ref } from 'vue';
  const model = defineModel();
  defineProps({
    inputType: {
      type: String,
      required: true
    },
    inputPlaceholder: {
      type: String,
      required: true
    },
    inputClass: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
  });

  const inputFile = ref(null);
  const clearInputComponent = () => {
    inputFile.value.value = null;
  }

  defineExpose({ clearInputComponent });
</script>

<template>
  <input
    v-model = "model"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :class="inputClass"
    :autocomplete="'off'"
    :disabled="isDisabled"
    v-if="inputType !== 'file'"
  />
  <input
    v-else
    ref = "inputFile"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :class="inputClass"
    :autocomplete="'off'"
    :disabled="isDisabled"
    multiple
    v-bind="{ multiple: inputType === 'file' }"
  />
</template>

