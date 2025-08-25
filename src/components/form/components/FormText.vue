<template>
  <div>
    <v-text-field 
      v-model="value"
      :model-value="value"
      density="compact" 
      autocomplete="off"
      variant="outlined"
      clearable
      :label="cmplabel"
      :rules="rules"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { IModelField } from '@/adapters/interfaces/form/IModelForm'
import { cmpField } from '@/composables/form/cmp_Field'

const props = defineProps<IModelField>()
const emit  = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = ref<string | null>(props.modelValue || null)

const {
  rules,
  cmplabel
} = cmpField(props)
</script>