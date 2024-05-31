<script setup>
  import { onMounted } from 'vue';
  import Options from './Option.vue';
  const model = defineModel();
  defineProps({
    selectClass: {
      type: String,
      require: true
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
        :setSelected="index === 0"
      />
    </template>
  </select>
</template>