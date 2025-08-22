<template>
  <div>
    <v-textarea
      density="compact" 
      autocomplete="off"
      variant="outlined"
      counter
      :label="cmplabel"
      :rules="rules"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup lang="ts">
import type { IModelField } from '@/adapters/interfaces/form/IModelForm'
import { cmpField } from '@/composables/form/cmp_Field'

const props = defineProps<IModelField>()
const emit  = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const {
  rules,
  cmplabel
} = cmpField(props)
</script>
