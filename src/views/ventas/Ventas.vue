<template>
  <v-row>
    <v-col cols="12" v-if="viewPermission">
      <Datatable :idTable="8">
        <template #custom-button>
          <v-btn 
            color="primary" 
            variant="outlined" 
            size="small" 
            rounded="md" 
            v-if="newPermission"
          >
            <v-icon>mdi-plus</v-icon>
            <span>{{ $t('BUTTON.NEW') }}</span>
          </v-btn>
        </template>
      </Datatable>
    </v-col>
    <v-col cols="12" v-else>
      <WithOutPermission />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { PermissionUtil } from '@/utils/PermissionUtil'

const { hasPermission } = PermissionUtil()

const newPermission = hasPermission('ventas-datatable-nuevo')
const viewPermission = hasPermission('ventas-datatable')
</script>