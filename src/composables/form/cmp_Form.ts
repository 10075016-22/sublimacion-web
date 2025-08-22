import { defineAsyncComponent, onMounted, ref, watch } from "vue"
import { useI18n } from "vue-i18n"

import apiClient from "@/services/api"

import type { IModelForm, IFormProps } from "@/adapters/interfaces/form/IModelForm"
import type { ApiResponse } from "@/types/services/api"
import { FormAdapter } from "@/adapters/implementations/form/FormAdaper"

export function cmpForm(props: IFormProps, emit: any) {
    
    const componentsMap = {
        'FORM_TEXT'     : defineAsyncComponent(() => import('@/components/form/components/FormText.vue')),
        'FORM_EMAIL'    : defineAsyncComponent(() => import('@/components/form/components/FormEmail.vue')),
        'FORM_FILE'     : defineAsyncComponent(() => import('@/components/form/components/FormFile.vue')),
        'FORM_SELECT'   : defineAsyncComponent(() => import('@/components/form/components/FormSelect.vue')),
        'FORM_TEXTAREA' : defineAsyncComponent(() => import('@/components/form/components/FormTextArea.vue')),
        'FORM_SWITCH'   : defineAsyncComponent(() => import('@/components/form/components/FormSwitch.vue')),
    }

    const { t } = useI18n()

    const form      = ref<boolean>(props.show) // formulario para nuevo registro
    const isLoading = ref<boolean>(false) // loading del formulario
    const aForm     = ref<IModelForm[]>([]) // array de campos del formulario
    const formRef   = ref<HTMLFormElement | null>(null)
    const loading   = ref<boolean>(false)
    const oForm     = ref<any>({}) // formulario para enviar

    const isNotification    = ref<boolean>(false)
    const textNotification  = ref<string>('')
    const colorNotification = ref<string>('')
    
    const onCancel = () => {
        form.value = false
        emit('onCancel', form.value)
    }

    const onSubmit = async () => {
        try {
            loading.value = true
            const { valid } = await formRef.value?.validate()
            if(valid) {
                const hasFile = Object.values(oForm.value).some(value => value instanceof File)
                const URL = `/v1/${props.endpoint}`
                if (hasFile) {                    
                    // enviamos la data con un post normal usando multipart/form-data
                    const formData = new FormData();
                    Object.entries(oForm.value).forEach(([key, value]) => {
                        if (value instanceof File) {
                            formData.append(key, value);
                        } else {
                            formData.append(key, String(value));
                        }
                    });
                    const response : ApiResponse = await apiClient.postFile(URL, formData, true)
                    if(response.message === 'OK') {
                        textNotification.value = t('FORM.FORM_SUCCESS')
                        colorNotification.value = 'success'
                        
                        emit('onCancel', true);
                        emit('onRefresh', true);
                        emit('update:modelValue', false)

                        form.value = false
                    } else {
                        textNotification.value = t('FORM.FORM_ERROR')
                        colorNotification.value = 'error'
                    }
                    isNotification.value = true;
                } else {
                    // enviamos la data con un post normal usando application/json
                }
                // postFile
            }
        } catch (error) {
            console.log({ error });
        } finally {
            loading.value = false
        }
    }

    const onGetForm = async () => {
        try {
            isLoading.value = true
            const URL = `/grid/configuracion/form/${props.idTable}` 
            const response: ApiResponse = await apiClient.get(URL)

            aForm.value = FormAdapter.toModelHeaders(response.data)                   
        } catch (error) {
            console.log({ error });            
        } finally {
            isLoading.value = false
        }
    }

    const hasComponent = (sComponent: string) => {
        return componentsMap[sComponent as keyof typeof componentsMap] || null
    }

    watch(() => props.show, (newValue) => {
        form.value = newValue
        if(form.value) onGetForm()
    }, { immediate: true })


    return {
        aForm,
        form,
        isLoading,
        formRef,
        oForm,
        loading,

        isNotification,
        textNotification,
        colorNotification,

        onCancel,
        onSubmit,
        hasComponent
    }
}