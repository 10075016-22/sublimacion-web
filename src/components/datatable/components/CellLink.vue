<template>
  <a :href="props.item[props.field]" target="_blank">
    {{ props.item[props.field] }}
  </a>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>