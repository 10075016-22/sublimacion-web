<template>
  <v-navigation-drawer color="backgroundPrimary">
    <v-list>
      <v-list-item :subtitle="oUser?.email" :title="oUser?.name" >
        <template v-slot:prepend>
          <v-avatar color="primary" size="35">
            <span class="text-h6">{{ oUser?.name.charAt(0).toUpperCase() }}</span>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list density="compact" nav>
      <template v-for="item in items" :key="item.id">
        <v-divider v-if="item.divider" />
        <v-list-item 
          v-else 
          :to="{name: item.path}" 
          :prepend-icon="item.icon" 
          :title="item.name" 
          :value="item.value" 
        />
      </template>
    </v-list>
    
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'

import { cmpUIMenu } from '@/composables/layout/cmp_UIMenu'

import { userStore } from '@/store/auth/userStore'

const { mobile } = useDisplay()

const { oUser } = storeToRefs(userStore())

const {
  items,
  isLoading
} = cmpUIMenu()
</script>