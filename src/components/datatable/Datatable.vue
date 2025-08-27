<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="items"
    :items-length="totalItems"
    :loading="isLoading"
    :loading-text="$t('DATATABLE.LOADING')"
    :no-data-text="$t('DATATABLE.NO_DATA')"
    :items-per-page-options="[5, 10, 25, 50, 100]"
    :group-by="props.groupBy"
    :show-expand="props.subDatatable || false"
    mobile-breakpoint="sm"
    item-value="id"
    class="text-caption"
    density="compact"
    height="70vh"
    color="primary"
    hover    
    @update:options="onLoadItems"
    :key="keyGrid"
  >
    <template v-slot:top>
      <v-toolbar height="45" class="mb-2" flat>
        <v-toolbar-title> 
          <v-icon :color="!props?.valorFiltro ? 'primary' : 'medium-emphasis'" size="small">{{ table?.icon }}</v-icon>
          <span :class="['ml-2 text-subtitle-2', !props?.valorFiltro ? 'text-primary' : '']">{{ table?.table }}</span>
        </v-toolbar-title>
        <v-spacer />
        <slot name="custom-button" />
        <v-btn
          v-if="props.nuevo || false"
          prepend-icon="mdi-plus"
          color="primary"
          variant="outlined"
          size="small"
          rounded="md"
          :text="$t('BUTTON.NEW')"
          @click="onNuevo"
        />

        <!-- Recarga -->
        <v-btn
          prepend-icon="mdi-refresh"
          color="indigo"
          variant="outlined"
          size="small"
          class="ml-2"
          :text="$t('BUTTON.REFRESH')"
          @click="onGetItems(pageServer, itemsPerPage)"
        />
      </v-toolbar>
    </template>

    <!-- Slot para renderizar los campos -->
    <template v-slot:[`item.${field.key}`]="{ item }" v-for="(field, index) in headers" :key="index">
      <div :class="onGetAlignment(field.align || 'start')">
        <component 
          v-if="field.component !== 'custom-column'"
          :is="hasComponent(field.component)"
          :item="item" 
          :field="field.key"
          :color="field.color || 'default'"
          :actions="actions"
          :table="table"
          @onRefresh="onRefresh"
        />
        <slot v-else name="custom-column" :item="item" />
      </div>
    </template>
    <!-- col group -->
    <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand }">
      <v-btn
        :icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        color="medium-emphasis"
        size="small"
        variant="text"
        @click="toggleExpand(internalItem)"
      />
    </template>

    <!-- custom column -->
    <template v-slot:[`item.custom-column`]> 
      <slot name="custom-column" :item="item" />
    </template>

    <!-- expanded row -->
    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="py-2">
          <v-sheet rounded="lg" border>
            <slot name="sub-datatable" :item="item" />
          </v-sheet>
        </td>
      </tr>
    </template>
  </v-data-table-server>
  <Form 
    :show="form"
    :idTable="props.idTable"
    :title="table?.table || '' "
    :endpoint="table?.endpoint || '' "
    :key="keyForm"
    @onCancel="($event) => form = $event"
    @onRefresh="onRefresh"
  />
</template>
<script lang="ts" setup>
import Form from '@/components/form/Form.vue'
import { cmpDatatable } from '@/composables/datatable/cmp_Datatable'

import type{ IPropsDatatable } from '@/adapters/interfaces/datatable/IModelDatatable'

const props = defineProps<IPropsDatatable>()

const onRefresh = () => {
  isLoading.value = true
  onGetItems(pageServer.value, itemsPerPage.value)
  isLoading.value = false
}

const {
  isLoading,
  headers,
  items,
  table,
  actions,

  form,
  keyForm,

  // pagination
  itemsPerPage,
  pageServer,
  search,
  serverItems,
  loading,
  totalItems,
  itemsGrid,
  bExportar,
  keyGrid,

  hasComponent,
  onGetAlignment,
  onLoadItems,
  onNuevo,
  onGetItems
} = cmpDatatable(props)
</script>