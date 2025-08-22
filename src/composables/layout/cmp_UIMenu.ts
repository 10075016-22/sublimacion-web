import { onMounted, ref } from "vue"

import { MenuAdapter } from "@/adapters/implementations/general/MenuAdapter";
import type { IModelModule, IModelModuleResponse } from "@/adapters/interfaces/IModule"

import apiClient from "@/services/api";

export function cmpUIMenu() {

    const items = ref<IModelModule[]>([])
    const isLoading = ref<boolean>(false)

    onMounted(async () => {
        await onGetModules()
    })

    const onGetModules = async () => {
        isLoading.value = true
        try {
            const response = await apiClient.get('/v1/modules', '', true)
            items.value = response.data.map((item: IModelModuleResponse) => MenuAdapter.toModel(item))
        } catch (error) {
            console.log(error);
        } finally {
            isLoading.value = false
        }
    }
    return {
        items,
        isLoading
    }
}
