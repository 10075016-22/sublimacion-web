<template>
  <div>
    <v-chip :color="props.item[props.field] ? 'success' : 'error'" size="small" label>
      <v-icon start :icon="props.item[props.field] ? 'mdi-circle' : 'mdi-circle-outline'" />
      {{ props.item[props.field] ? $t('STATUS.ACTIVE') : $t('STATUS.INACTIVE') }}
    </v-chip>
  </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>