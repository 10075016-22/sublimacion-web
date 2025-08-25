<template>
  <div>
    <v-autocomplete
      v-model="value"
      :items="items"
      :label="cmplabel"
      :rules="rules"
      :model-value="value"
      :loading="loading"
      item-value="id"
      item-title="text"
      density="compact"
      variant="outlined"
      autocomplete="off"
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
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const value = ref<string | null>(props.modelValue || null)

const {
  items,
  loading,
  rules,
  cmplabel,
} = cmpField(props)
</script>