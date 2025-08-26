import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { cmpLogin } from '@/composables/auth/cmp_Login'
import { userStore } from '@/store/auth/userStore'

// Mock de vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Mock de vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key: string) => key
  })
}))

// Mock del servicio API
vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn()
  }
}))

describe('cmpLogin', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('debe tener valores por defecto correctos', () => {
      const { formData, isValid, isLoading } = cmpLogin()

      expect(formData.value.email).toBe('email@test.com')
      expect(formData.value.password).toBe('test123')
      expect(isValid.value).toBe(false)
      expect(isLoading.value).toBe(false)
    })
  })

  describe('Validaciones', () => {
    it('debe validar email correctamente', () => {
      const { ruleUser } = cmpLogin()

      // Email válido
      expect(ruleUser[0]('test@example.com')).toBe(true)
      expect(ruleUser[1]('test@example.com')).toBe(true)

      // Email inválido
      expect(ruleUser[0]('')).toBe('LOGIN.REQUIRED_USER')
      expect(ruleUser[1]('invalid-email')).toBe('LOGIN.INVALID_USER')
    })

    it('debe validar contraseña correctamente', () => {
      const { rulePassword } = cmpLogin()

      // Contraseña válida
      expect(rulePassword[0]('password123')).toBe(true)
      expect(rulePassword[1]('password123')).toBe(true)

      // Contraseña inválida
      expect(rulePassword[0]('')).toBe('LOGIN.REQUIRED_PASS')
      expect(rulePassword[1]('123')).toBe('LOGIN.INVALID_PASS')
    })
  })

  describe('handleLogin', () => {
    it('debe manejar el login exitoso', async () => {
      const { handleLogin, formData, formRef } = cmpLogin()
      
      // Mock del formulario
      const mockForm = {
        validate: vi.fn().mockResolvedValue({ valid: true })
      }
      formRef.value = mockForm as any

      // Mock de la respuesta de la API
      const mockApiResponse = {
        data: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          token: 'test-token',
          role: 'admin'
        }
      }

      const apiClient = await import('@/services/api')
      vi.mocked(apiClient.default.post).mockResolvedValue(mockApiResponse)

      await handleLogin()

      expect(apiClient.default.post).toHaveBeenCalledWith('/login', {
        email: 'email@test.com',
        password: expect.any(String), // MD5 hash
        ip: ''
      })
    })

    it('debe manejar errores de validación del formulario', async () => {
      const { handleLogin, formRef } = cmpLogin()
      
      // Mock del formulario con validación fallida
      const mockForm = {
        validate: vi.fn().mockResolvedValue({ valid: false })
      }
      formRef.value = mockForm as any

      const apiClient = await import('@/services/api')
      
      await handleLogin()

      expect(apiClient.default.post).not.toHaveBeenCalled()
    })

    it('debe manejar errores de la API', async () => {
      const { handleLogin, formRef } = cmpLogin()
      
      // Mock del formulario
      const mockForm = {
        validate: vi.fn().mockResolvedValue({ valid: true })
      }
      formRef.value = mockForm as any

      // Mock de error de la API
      const apiClient = await import('@/services/api')
      vi.mocked(apiClient.default.post).mockRejectedValue(new Error('API Error'))

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await handleLogin()

      expect(consoleSpy).toHaveBeenCalledWith({ error: expect.any(Error) })
      
      consoleSpy.mockRestore()
    })
  })
})
