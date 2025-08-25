<template>
  <div>
    <v-switch
      color="primary"
      :label="cmplabel"
      :rules="rules"
      :model-value="value"
      v-model="value"
      @update:model-value="emit('update:modelValue', $event ? 1 : 0)"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"

import type { IModelField } from '@/adapters/interfaces/form/IModelForm'
import { cmpField } from '@/composables/form/cmp_Field'

const props = defineProps<IModelField>()
const emit  = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const { t } = useI18n()

const value = ref<boolean | null>(props.modelValue === 1 || null)

const rules = [
  (v: boolean) => (props.required ? (v !== null && v !== undefined)  || t('FORM.REQUIRED') : true)
]



const { cmplabel } = cmpField(props)
</script>