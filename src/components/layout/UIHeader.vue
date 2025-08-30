<template>
  <v-app-bar color="backgroundPrimary" elevation="1" density="compact">
    <UIClock class="ml-4"/>
    <template #append>
      <UIProfile class="mr-2"/>
      <UIThemeButton class="mr-2"/>
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
import UIProfile from '@/components/layout/components/UIProfile.vue'
import UIThemeButton from '@/components/common/UIThemeButton.vue'
import UIClock from '@/components/common/UIClock.vue'
</script>