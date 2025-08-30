<template>
  <v-card elevation="0" class="pa-2" variant="outlined">
    <v-card-text>
      <div class="d-flex align-center mb-1">
        <v-icon v-if="icon" class="me-1">mdi-{{ icon }}</v-icon>
        <span class="text-subtitle-2 mt-1">{{ title }}</span>
      </div>

      <div class="d-flex justify-space-between align-center">
        <span class="text-h5 font-weight-bold">{{ value }}</span>
        <div>
        <v-icon v-if="percentage == 0" class="ms-2 me-1 text-success">mdi-trending-neutral</v-icon>
        <v-icon v-else-if="percentage > 0" class="ms-2 me-1 text-success">mdi-trending-up</v-icon>
        <v-icon v-else class="ms-2 me-1 text-error">mdi-trending-down</v-icon>
          <span class="text-subtitle-2 text-success">{{ percentage }}</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  icon?: string;
  value: string | number;
  percentage: number;
}>()
</script>