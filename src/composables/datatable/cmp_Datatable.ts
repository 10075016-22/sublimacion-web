import { defineAsyncComponent, onMounted, ref, watch } from "vue";

import apiClient from "@/services/api";
import type { ApiResponse } from "@/types/services/api";
import type { IFetchData, IModelActionsResponse, IModelHeaders, IModelHeadersResponse, IModelTable, IPropsDatatable } from "@/adapters/interfaces/datatable/IModelDatatable";
import { DatatableAdapter } from "@/adapters/implementations/datatable/DatatableAdapter";

export function cmpDatatable(props: IPropsDatatable) {
    const isLoading = ref<boolean>(false)
    const headers = ref<IModelHeaders[]>([])
    const table = ref<IModelTable | null>()
    const actions = ref<IModelActionsResponse[]>([])

    const items = ref<any[]>([])

    // pagination
    const itemsPerPage = ref<number>(10) // items por pagina
    const pageServer = ref<number>(1) // pagina actual
    const search = ref<string>('') // busqueda
    const serverItems = ref<any[]>([]) // items del servidor
    const loading = ref<boolean>(true) // loading
    const totalItems = ref<number>(0) // total de items
    const itemsGrid = ref<any[]>([]) // items de la grid consultados desde el endpoint - pGrids
    const bExportar = ref<boolean>(false) // v-model para menu exportar
    const keyGrid = ref<number>(0) // key para la grid

    // formulario
    const form     = ref<boolean>(false) // formulario para nuevo registro
    const keyForm  = ref<number>(0) // key para el formulario

    // manejo de componentes asyncronos
    const componentsMap = {
        'FIELD_TEXT'   : defineAsyncComponent(() => import('@/components/datatable/components/CellText.vue')),
        'FIELD_ACTION' : defineAsyncComponent(() => import('@/components/datatable/components/CellAction.vue')),
        'FIELD_STATUS' : defineAsyncComponent(() => import('@/components/datatable/components/CellStatus.vue')),
        'FIELD_LOGO'   : defineAsyncComponent(() => import('@/components/datatable/components/CellLogo.vue')),
        'FIELD_YES_NO' : defineAsyncComponent(() => import('@/components/datatable/components/CellYesNo.vue')),
        'FIELD_CHIP'   : defineAsyncComponent(() => import('@/components/datatable/components/CellChip.vue')),
        'FIELD_COLOR'  : defineAsyncComponent(() => import('@/components/datatable/components/CellColor.vue')),
        'FIELD_HTML'   : defineAsyncComponent(() => import('@/components/datatable/components/CellHtml.vue')),
        'FIELD_FILE'   : defineAsyncComponent(() => import('@/components/datatable/components/CellFile.vue')),
    }

    // vue native methods
    onMounted(async () => {
        await onGetTable()
        await onGetHeaders()
        await onGetActions()

        if(headers.value.length) {
            await onGetItems(1, itemsPerPage.value)
        }
    })

    const onGetItems = async (page?: number, itemsPerPage?: number) => {
        try {
            isLoading.value = true
            // validamos primero que table no sea null
            if(table.value) {
                let URL = `/v1/${table.value.endpoint}/datatable`
                let params = ''
                if(page && itemsPerPage) {
                    params += `&page=${page}&limit=${itemsPerPage}`
                }
                
                if(!!props.campoFiltro && !!props.valorFiltro) {
                    params += `&field_id=${props.campoFiltro}&field_value=${props.valorFiltro}`
                }
                const response : ApiResponse = await apiClient.get(URL, params, true)
                const { data, total } = response.data

                // asignamos los items y el total
                items.value      = data
                totalItems.value = total
            }
            
        } catch (error) {
            console.log({ error });
        }
        finally {
            isLoading.value = false
        }
    }

    const onGetHeaders = async () => {
        try {
            isLoading.value = true
            const URL = `/grid/configuracion/headers/${props.idTable}`
            const response : ApiResponse = await apiClient.get(URL, '', true)

            if(response.data.length === 0) return
            // obtenemos la tabla para la datatable
            headers.value = DatatableAdapter.toModelHeaders(response.data)
            
        } catch (error) {
            console.log({ error });
        }
        finally {
            isLoading.value = false
        }
    }

    const onGetActions = async () => {
        try {
            const URL = `/grid/configuracion/actions/${props.idTable}`
            const response : ApiResponse = await apiClient.get(URL, '', true)
            if(response.data.length === 0) {
                if(props.customColumn) {
                    headers.value.push({
                        title: 'Acciones',
                        key: 'custom-column',
                        sortable: false,
                        width: '100',
                        fixed: true,
                        align: 'center',
                        order: 100,
                        component: 'custom-column'
                    })
                }
                return
            } else {
                actions.value = response.data
                // añadimos la columna de acciones al final
                const accionesColumn = {
                    title: 'Acciones',
                    key: 'actions',
                    sortable: false,
                    width: '100',
                    fixed: true,
                    align: 'center',
                    order: 100,
                    component: 'FIELD_ACTION'
                }
                const customColumn = {
                    title: 'Acciones adicionales',
                    key: 'custom-column',
                    sortable: false,
                    width: '100',
                    fixed: true,
                    align: 'center',
                    order: 100,
                    component: 'custom-column'
                }
                if(props.customColumn) {
                    headers.value.push(accionesColumn, customColumn)
                } else {
                    headers.value.push(accionesColumn)
                }
            }
        } catch (error) {
            console.log({error});            
        }
    }

    const onGetTable = async () => {
        try {
            isLoading.value = true
            const URL = `/grid/configuracion/table/${props.idTable}`
            const response : ApiResponse = await apiClient.get(URL, '', true)

            if(response.data.length === 0) return   
            // obtenemos la tabla para la datatable
            table.value = DatatableAdapter.toModelTable(response.data)
            
        } catch (error) {
            console.log({ error });
        }
        finally {
            isLoading.value = false
        }
    }

    const isInitialLoad = ref<boolean>(true) // indica si es la primera carga
    const onLoadItems = async ({ page, itemsPerPage }: IFetchData) => {
        // Evitar múltiples peticiones durante la carga inicial
        if (isInitialLoad.value) {
            isInitialLoad.value = false
        } else {
            if(isLoading.value) return
        }

        // Reiniciar el estado de carga
        isLoading.value = true

        // actualizamos la pagina actual
        pageServer.value = page
         
        // validamos si cambia la pagina o itemsPerPage
        if(page !== pageServer.value || itemsPerPage !== itemsPerPage.value) {
            await onGetItems(page, itemsPerPage)
        }
    }

    const hasComponent = (sComponent: string) => {
        // Retornamos el componente
        return componentsMap[sComponent as keyof typeof componentsMap] || null
    }

    const onGetAlignment = (sAlignment: string) => {
        switch (sAlignment) {
            case 'center':
                return 'text-center'
            case 'end':
                return 'text-right'
            case 'start':
            default:
                return 'text-left'
        }
    }


    // formulario 
    const onNuevo = () => {
        form.value = true
        keyForm.value++
    }


    return {
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

        // actions
        hasComponent,
        onGetAlignment,
        onLoadItems,
        onNuevo,
        onGetItems
    }
}