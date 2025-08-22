import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IModelField } from '@/adapters/interfaces/form/IModelForm'

export function cmpField(props: IModelField) {
    const { t } = useI18n()
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


    const cmplabel = computed(() => {
        return props.required ? `${props.label} *` : props.label
    })
    
    return {
        rules,
        ruleEmail,
        cmplabel
    }
}