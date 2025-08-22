<template>
  <div>
    <v-text-field 
      density="compact" 
      autocomplete="off"
      variant="outlined"
      :label="label"
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
  rules
} = cmpField(props)
</script>
