<template>
  <v-tooltip :text="$t('BUTTON.CHANGE_THEME')" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" @click="toggleTheme" icon size="small" color="primary">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { navigationStore } from '@/store/general/navigationStore'

const theme = useTheme()
const { setbDark } = navigationStore()

const toggleTheme = () => {
  theme.change(theme.global.current.value.dark ? 'light' : 'dark')
  setbDark(theme.global.current.value.dark)
}
</script>
