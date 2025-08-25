<template>
  <div>
    <v-file-input
      density="compact"
      variant="outlined"
      multi-line
      :label="label"
      :rules="rules"
      :accept="accept"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
  <div v-if="value && props?.edition">
    <v-divider />
    <v-list>
      <v-list-item class="d-flex justify-space-between">
        <v-list-item-title style="display: flex; align-items: center">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{ value }}</span>
          <v-btn size="x-small" icon elevation="0" tile color="primary" @click="openFile(value)" variant="text" style="margin-left: 0.5rem">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IModelField } from '@/adapters/interfaces/form/IModelForm'
import { cmpField } from '@/composables/form/cmp_Field'

const props = defineProps<IModelField>()
const emit  = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = ref<string | null>(props.modelValue || null)

const {
  rules
} = cmpField(props)

const accept = computed(() => {
  if(typeof props.item === 'undefined') return null
  if(props.item?.tipo_documento?.tipoArchivo) {
    return props.item?.tipo_documento?.tipoArchivo
  }
  return null
})

const openFile = (url: string) => {
  window.open(url, '_blank')
}
</script>