<template>
    <v-snackbar v-model="localSnackbar" location="bottom right" :color="color || 'success' " >
        {{ text }}
        <template v-slot:actions>
            <v-btn icon variant="text" @click="closeSnackbar">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    modelValue: boolean;
    text: string;
    color: any;
}

const props = defineProps<Props>()
const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

const localSnackbar = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const closeSnackbar = () => {
    emit('update:modelValue', false)
}
</script>