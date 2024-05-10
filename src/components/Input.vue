<script setup>
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
    inputValue: {
      type: String,
      required: false
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
  });
</script>

<template>
  <input
    v-model = "model"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :class="inputClass"
    :value="model"
    :autocomplete="'off'"
    :disabled="isDisabled"
    v-if="inputType !== 'file'"
  />
  <input
    v-else
    :type="inputType"
    :placeholder="inputPlaceholder"
    :class="inputClass"
    :value="inputValue"
    :autocomplete="'off'"
    :disabled="isDisabled"
    multiple
    v-bind="{ multiple: inputType === 'file' }"
  />
</template>

