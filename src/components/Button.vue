<script setup>
  defineProps({
    buttonText: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      required: true
    },
    onClickEvent: {
      type: Function,
      required: true
    },
    buttonValue: {
      type: Number,
      required: false
    },
    iconSetting: {
      type: String,
      required: false
    },
    buttonTitle: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
  });
</script>

<template>
  <button
    :type="buttonType"
    :class="buttonClass"
    @click="onClickEvent"
    :value="buttonValue"
    :title="buttonTitle"
    :style="{ animation: '1s ease 0s 1 normal none running fadeIn' }"
    :disabled="isDisabled"
  >
    <span v-if="iconSetting && buttonText">
      <i :class = "iconSetting"></i>&nbsp;{{ buttonText }}
    </span>
    <span v-else>
      <i :class = "iconSetting"></i>
    </span>
    
  </button>
</template>