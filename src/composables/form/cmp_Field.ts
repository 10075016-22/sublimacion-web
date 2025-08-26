import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import apiClient from '@/services/api'

import type { IModelField, IModelSelectField } from '@/adapters/interfaces/form/IModelForm'
import type { ApiResponse } from '@/types/services/api'

export function cmpField(props: IModelField) {
    const { t } = useI18n()

    const items = ref<IModelSelectField[]>([])
    const loading = ref<boolean>(false)

    const rules = computed(() => {
        if (props.required) {
            return [ 
                (v: string) => !!v || t('FORM.REQUIRED')
            ]
        }
        return []
    })

    const ruleEmail = computed(() => {
        const emailRules = []

        if (props.required) {
            emailRules.push((v: string) => !!v || t('FORM.REQUIRED'))
        }

        emailRules.push((v: string) => {
            if (!v) return true
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(v) || t('FORM.INVALID_EMAIL')
        })

        return emailRules
    })

    const rulesUrl = computed(() => {
        const urlRules = []
        if (props.required) {
            urlRules.push((v: string) => !!v || t('FORM.REQUIRED'))
        }

        urlRules.push((v: string) => {
            if (!v) return true
            const urlRegex = /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/.*)?$/i
            return urlRegex.test(v) || t('FORM.INVALID_URL')
        })

        return urlRules
    })

    const cmplabel = computed(() => {
        return props.required ? `${props.label} *` : props.label
    })

    const getItemsSelect = async () => {
        try {
            loading.value = true
            const URL = `/form/select/${props.id}` 
            const response: ApiResponse = await apiClient.get(URL)
            items.value = response.data
        } catch (error) {
            console.log({ error });            
        } finally {
            loading.value = false
        }
    }

    onMounted(async () => {
        if(props.component === "FORM_SELECT") { // solamente si es un select
            await getItemsSelect()
        }
    })
    
    return {
        items,
        loading,
        rules,
        ruleEmail,
        rulesUrl,
        cmplabel
    }
}