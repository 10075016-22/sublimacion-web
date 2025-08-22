<template>
  <v-row>
    <v-col cols="12">
      <Datatable 
        :idTable="2"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import Datatable from '@/components/datatable/Datatable.vue'
</script>