<template>
  <v-row>
    <v-col cols="12" v-if="viewPermission">
      <Datatable :idTable="3" :nuevo="newPermission" />
    </v-col>
    <v-col cols="12" v-else>
      <WithOutPermission />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { PermissionUtil } from '@/utils/PermissionUtil'

const { hasPermission } = PermissionUtil()

const newPermission = hasPermission('productos-datatable-nuevo')
const viewPermission = hasPermission('productos-datatable')
</script>