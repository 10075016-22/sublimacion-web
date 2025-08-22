<template>
  <div>
    <v-chip size="small" label>
      {{ props.item[props.field] }}
    </v-chip>
  </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>