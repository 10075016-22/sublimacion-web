<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-avatar color="primary" size="35" v-bind="props">
          <span class="text-h6">{{ oUser?.name.charAt(0).toUpperCase() }}</span>
        </v-avatar>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item :subtitle="oUser?.email" :title="oUser?.name">
            <template v-slot:prepend>
              <v-avatar color="primary" size="35" tile>
                <span class="text-h6">{{ oUser?.name.charAt(0).toUpperCase() }}</span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider />
        <v-list>
          <v-list-item>
            <v-btn color="primary" block :loading="isLoading" class="mb-6" @click="handleLogout" variant="outlined">
              <v-icon start>mdi-logout</v-icon> 
              {{ $t('BUTTON.LOGOUT') }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { userStore } from '@/store/auth/userStore'

const { oUser } = storeToRefs(userStore())

const menu = ref<boolean>(false)

const isLoading = ref<boolean>(false)

const handleLogout = () => {
  isLoading.value = true
  try {
    const { resetUser } = userStore()
    resetUser()
    localStorage.clear()
    let { location } = window
    location.href = location.origin
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

</script>
