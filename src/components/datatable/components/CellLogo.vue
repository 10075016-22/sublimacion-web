<template>
  <div class="pa-1">
    <v-avatar size="35">
        <img :src="src" alt="Logo" @error="onError" />
    </v-avatar>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

import withoutImage from '@/assets/images/without-logo.png'

const props = defineProps<IModelCell>()

const src = ref<string>('')

onMounted(() => {
    src.value = props.item[props.field]
})

const onError = () => {
    src.value = withoutImage
}
</script>