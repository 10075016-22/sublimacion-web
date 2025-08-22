import md5 from 'md5'
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { userStore } from '@/store/auth/userStore'

import apiClient from "@/services/api";

import type { ApiResponse } from "@/types/services/api";
import { LoginAdapter } from "@/adapters/implementations/auth/LoginAdapter";


interface LoginForm {
    email: string;
    password: string;
}

export function cmpLogin() {

    const { t } = useI18n()
    const router = useRouter()

    const { ip, setUser } = userStore()

    const formData = ref<LoginForm>({
        email: 'email@test.com',
        password: 'test123'
    })
    const ruleUser = [
        (v: string) => !!v || t('LOGIN.REQUIRED_USER'),
        (v: string) => /.+@.+\..+/.test(v) || t('LOGIN.INVALID_USER')
    ]

    const rulePassword = [
        (v: string) => !!v || t('LOGIN.REQUIRED_PASS'),
        (v: string) => v.length >= 6 || t('LOGIN.INVALID_PASS')
    ]

    const showPassword = ref(false)

    // form
    const formRef = ref<HTMLFormElement | null>(null)
    const isValid = ref<boolean>(false)
    const isLoading = ref<boolean>(false)


    const handleLogin = async () => {
        const form = formRef.value
        if (!form) return

        const { valid } = await form.validate()
        if (!valid) return

        isLoading.value = true

        try {
            const { email, password } = formData.value
            const body = {
                email,
                password: md5(password),
                ip: ip 
            }
            const response: ApiResponse = await apiClient.post('/login', body)
            const user = LoginAdapter.toModel(response.data)            
            setUser(user)            
            router.push({ name: 'dashboard' })
        } catch (error) {
            console.log({error});
        } finally {
            isLoading.value = false;
        }
        
    }

    return {
        formData,
        showPassword,
        formRef,
        isValid,
        isLoading,

        // rules
        ruleUser,
        rulePassword,

        // actions
        handleLogin,
    }
}