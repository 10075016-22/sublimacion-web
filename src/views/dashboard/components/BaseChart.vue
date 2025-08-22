<template>
  <GChart
    :type="chart.type"
    :data="chart.data"
    :options="chart.options"
  />
</template>

<script lang="ts" setup>
import { GChart } from 'vue-google-charts'
import type { IModelChart } from '@/types/general/IChart'

const props = defineProps<{
  chart: IModelChart
}>()
</script>