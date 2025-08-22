<template>
  <div>
    <v-chip :color="props.item[props.field] ? 'success' : 'error'" size="x-small" label>
      <v-icon start :icon="props.item[props.field] ? 'mdi-check' : 'mdi-close'" />
      {{ props.item[props.field] ? $t('YES_NO.YES') : $t('YES_NO.NO') }}
    </v-chip>
  </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>