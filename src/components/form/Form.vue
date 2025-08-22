<template>
  <v-dialog v-model="form" scrollable max-width="700" persistent>
    <v-card :loading="isLoading">
      <v-toolbar height="45">
        <v-toolbar-title class="font-weight-medium">{{ title }} </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form ref="formRef" v-if="!isLoading">
          <v-row class="mt-2" v-if="aForm.length > 0">
            <v-col v-for="(item, index) in aForm" :key="index" :cols="item.size">
              <component 
                :is="hasComponent(item.component)" 
                :label="item.label"
                :name="item.fieldname"
                :required="item.required"
                :editable="item.editable"
                :filterField="item.filterField"
                :info="item.info || '' "
                :modifyTo="item.modifyTo"
                v-model="oForm[item.fieldname]"
              />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <v-empty-state
                image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
                :text="$t('LABEL.NO_FORM_TEXT')"
                :title="$t('LABEL.NO_FORM')"
              />
            </v-col>
          </v-row>
        </v-form>
        <div v-else>
          <v-skeleton-loader type="article, actions" />
        </div>
      </v-card-text>
      <v-card-actions v-if="!isLoading">
        <v-spacer />
        <v-btn color="error" size="small" @click="onCancel">
          {{ $t('BUTTON.CANCEL') }}
        </v-btn>
        <v-btn color="primary" size="small" v-if="aForm.length > 0" :loading="loading" @click="onSubmit">
          {{ $t('BUTTON.SAVE') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <Notification 
    v-model="isNotification"
    :text="textNotification" 
    :color="colorNotification"
  />
</template>
<script setup lang="ts">

import type { IFormProps } from '@/adapters/interfaces/form/IModelForm'
import { cmpForm } from '@/composables/form/cmp_Form'
import Notification from '@/components/common/Notification.vue'

const props = defineProps<IFormProps>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void, // para actualizar el estado del formulario
  (e: 'onCancel' , value: boolean): void, // para cancelar el formulario
  (e: 'onRefresh', value: boolean): void
}>()

const {
  aForm,
  form,
  formRef,
  oForm,
  loading,

  isLoading,
  
  isNotification,
  textNotification,
  colorNotification,

  onCancel,
  onSubmit,
  hasComponent
} = cmpForm(props, emit)

</script>