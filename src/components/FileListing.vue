<script setup>
import { ref } from 'vue';
import FileListItem from './FileListItem.vue';
const props = defineProps({
  serviceDocs: {
    type: Array,
    require: true
  }
});

</script>

<template>
  <ul class = "p-4 list-none mt-2 text-left" v-if = "serviceDocs.length > 0">
    <FileListItem
      v-for = "serviceDoc in serviceDocs"
      v-if = "serviceDocs.length > 0"
      :serviceDoc = "serviceDoc"
      :key = "serviceDoc.id"
    />
  </ul>
</template>