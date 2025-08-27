<template>
  <div>
    <v-chip size="small" :color="props.color" label>
      {{ props.item[props.field] }}
    </v-chip>
  </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>