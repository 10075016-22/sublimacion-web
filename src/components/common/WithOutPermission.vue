<template>
  <div>
    <v-alert type="error" :text="$t('MESSAGES.NOT_PERMISSION')" variant="tonal" icon="mdi-lock" />
    <v-skeleton-loader type="card" class="mt-4"/>
  </div>
</template>