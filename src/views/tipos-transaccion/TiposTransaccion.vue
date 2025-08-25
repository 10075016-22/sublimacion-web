<template>
    <v-row>
      <v-col cols="12" v-if="viewPermission">
        <Datatable :idTable="9" :nuevo="newPermission" />
      </v-col>
      <v-col cols="12" v-else>
        <WithOutPermission />
      </v-col>
    </v-row>
  </template>
  <script lang="ts" setup>
  import { PermissionUtil } from '@/utils/PermissionUtil'
  
  const { hasPermission } = PermissionUtil()
  
  const newPermission = hasPermission('tipos-transaccion-datatable-nuevo')
  const viewPermission = hasPermission('tipos-transaccion-datatable')
  </script>