import { defineStore } from "pinia";
import { ref } from "vue";

export const navigationStore = defineStore('navigationStore', () => {
    const language = ref<string>('es')
    const bDark = ref<boolean>(false)

    const setbDark = (value: boolean) => {
        bDark.value = value
    }

    return {
        language,
        bDark,
        setbDark
    }
}, { persist: true })