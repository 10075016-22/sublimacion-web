<template>
  <div>
    {{ formatCurrency(props.item[props.field]) }}
  </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(value)
}
</script>