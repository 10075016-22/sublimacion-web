import { computed, ref } from "vue";
import { defineStore } from "pinia";

import type { IModelUser } from "@/adapters/interfaces/IUser";

export const userStore = defineStore('userStore', () => {
    const oUser = ref<IModelUser | null>()
    const ip = ref<string>('')

    // actions

    const setUser = (user: IModelUser) => {
        oUser.value = user
    }

    const resetUser = () => {
        oUser.value = null
    }

    // computed
    const authenticated = computed(() => oUser.value !== null)

    return {
        oUser,
        ip,

        // computed
        authenticated,

        // actions
        setUser,
        resetUser
    }
}, { persist: true })