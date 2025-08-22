<template>
  <div class="pa-1">
    <v-avatar size="35">
      <img 
        :src="src" 
        alt="Logo" 
        @error="onError"
        class="logo"
      />
    </v-avatar>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

import withoutImage from '@/assets/images/without-logo.png'

const props = defineProps<IModelCell>()

const isError = ref<boolean>(false)

const onError = () => {
  isError.value = true
}

const src = computed(() => {
  if(isError.value) {
    return withoutImage
  }
  return props.item[props.field]
})
</script>
<style scoped>
.logo {
  object-fit: contain; 
  width: 100%; height: 100%;
}
</style>