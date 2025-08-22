<template>
    <div>
        <v-icon>mdi-dots-vertical</v-icon>
    </div>
</template>
<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'

const props = defineProps<IModelCell>()
</script>
