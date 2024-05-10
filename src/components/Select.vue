<script setup>
  import Options from './Option.vue';
  const model = defineModel();
  defineProps({
    selectValue: {
      type: [String, Number],
      require: true
    },
    selectClass: {
      type: String,
      require: true
    },
    selectId: {
      type: String,
      require: false
    },
    onChangeEvent: {
      type: Function,
      require: false
    },
    isDisabled: {
      type: Boolean,
      require: false
    },
    options: {
      type: Array,
      require: false
    },
  });
</script>
<template>
  <select
    :class="selectClass"
    :value="selectValue"
    v-model="model"
    @change="onChangeEvent"
    :disabled="isDisabled"
  >
    <template v-if="options">
      <Options
        v-for="(option, index) in options"
        :key="option.id || index"
        :optionText="option.description"
        :optionValue="option.id || index"
      />
    </template>
  </select>
</template>