<template>
  <div>
    <v-textarea
      density="compact" 
      autocomplete="off"
      variant="outlined"
      counter
      :label="cmplabel"
      :rules="rules"
      :model-value="value"
      v-model="value"
      clearable
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