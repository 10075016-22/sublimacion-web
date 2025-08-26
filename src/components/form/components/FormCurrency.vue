<template>
  <div>
    <v-text-field 
      v-model="value"
      density="compact" 
      autocomplete="off"
      variant="outlined"
      clearable
      :label="cmplabel"
      :rules="rules"
      @update:model-value="emit('update:modelValue', $event)"
      :hint="valorEnPesos"
      persistent-hint
      type="number"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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

// Computed para mostrar el valor en pesos colombianos
const valorEnPesos = computed(() => {
  if (!value.value || isNaN(Number(value.value))) return 'Ingrese un valor en pesos colombianos'
  // Formatear el valor como moneda COP
  return Number(value.value).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
})

// Opcional: sincronizar el valor inicial si cambia el prop modelValue
watch(() => props.modelValue, (nuevo) => {
  value.value = nuevo
})
</script>