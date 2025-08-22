<template>
  <div>
    {{ props.item[props.field] }}
  </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>