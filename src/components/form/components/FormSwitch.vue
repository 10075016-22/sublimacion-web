<template>
  <div>
    <v-switch
      color="primary"
      :label="cmplabel"
      :rules="rules"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n"

import type { IModelField } from '@/adapters/interfaces/form/IModelForm'
import { cmpField } from '@/composables/form/cmp_Field'

const props = defineProps<IModelField>()
const emit  = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { t } = useI18n()

const rules = [
  (v: boolean) => (props.required ? (v !== null && v !== undefined)  || t('FORM.REQUIRED') : true)
]

const { cmplabel } = cmpField(props)
</script>
