<template>
    <div>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template #activator="{ props: menuProps }">
          <v-text-field
            v-bind="menuProps"
            v-model="internalValue"
            density="compact"
            autocomplete="off"
            variant="outlined"
            clearable
            :label="cmplabel"
            :rules="rules"
            readonly
          />
        </template>
  
        <v-date-picker color="primary" hide-header v-model="internalValue" @update:model-value="onDateSelected" />
      </v-menu>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { cmpField } from '@/composables/form/cmp_Field'
  import type { IModelField } from '@/adapters/interfaces/form/IModelForm'
  import moment from 'moment'
  
  const props = defineProps<IModelField>()
  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
  }>()
  
  const {
    rules,
    cmplabel
  } = cmpField(props)
  
  const menu = ref(false)
  const internalValue = ref<string | undefined>(props.modelValue || '')
  
  watch(() => props.modelValue, (newVal) => {
    internalValue.value = newVal
  })
  
  function onDateSelected(val: string) {
    menu.value = false
  const date = new Date(val)
  const formattedDate = moment(date).format('YYYY-MM-DD')
  internalValue.value = formattedDate
    emit('update:modelValue', formattedDate)
  }
  </script>