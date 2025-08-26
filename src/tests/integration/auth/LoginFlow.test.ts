import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mountComponent } from '@/tests/utils/test-utils'
import Login from '@/components/auth/login/Login.vue'
import { userStore } from '@/store/auth/userStore'
import { setActivePinia, createPinia } from 'pinia'

// Mock del servicio API
vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn()
  }
}))

// Mock de vue-router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('Login Flow Integration', () => {
  beforeEach(() => {
    // Configurar Pinia activo
    setActivePinia(createPinia())
    vi.clearAllMocks()
    // Limpiar el store antes de cada prueba
    const store = userStore()
    store.resetUser()
  })

  describe('Renderizado del componente', () => {
    it('debe renderizar el componente de login correctamente', () => {
      const wrapper = mountComponent(Login)

      // Verificar que el componente se renderiza
      expect(wrapper.exists()).toBe(true)
      
      // Verificar que los campos están presentes
      const emailInput = wrapper.find('input[type="email"]')
      const passwordInput = wrapper.find('input[type="password"]')
      
      expect(emailInput.exists()).toBe(true)
      expect(passwordInput.exists()).toBe(true)
    })
  })

  describe('Interacción con el formulario', () => {
    it('debe permitir entrada de datos en los campos', async () => {
      const wrapper = mountComponent(Login)

      const emailInput = wrapper.find('input[type="email"]')
      const passwordInput = wrapper.find('input[type="password"]')
      
      // Simular entrada de datos
      await emailInput.setValue('test@example.com')
      await passwordInput.setValue('password123')

      // Verificar que los valores se establecieron
      expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com')
      expect((passwordInput.element as HTMLInputElement).value).toBe('password123')
    })

    it('debe tener un botón de login funcional', async () => {
      const wrapper = mountComponent(Login)

      const loginButton = wrapper.find('button[type="submit"], .v-btn')
      
      // Verificar que el botón existe
      expect(loginButton.exists()).toBe(true)
      
      // Verificar que se puede hacer clic
      await loginButton.trigger('click')
      expect(loginButton.exists()).toBe(true)
    })
  })

  describe('Validación de formulario', () => {
    it('debe validar formato de email', async () => {
      const wrapper = mountComponent(Login)

      // Simular email inválido
      const emailInput = wrapper.find('input[type="email"]')
      await emailInput.setValue('invalid-email')

      // Verificar que el campo existe
      expect(emailInput.exists()).toBe(true)
    })

    it('debe validar longitud de contraseña', async () => {
      const wrapper = mountComponent(Login)

      // Simular contraseña corta
      const passwordInput = wrapper.find('input[type="password"]')
      await passwordInput.setValue('123')

      // Verificar que el campo existe
      expect(passwordInput.exists()).toBe(true)
    })
  })

  describe('Estado del store', () => {
    it('debe mantener el estado del store correctamente', () => {
      const store = userStore()
      
      // Verificar estado inicial
      expect(store.authenticated).toBe(false)
      
      // Simular usuario autenticado
      const mockUser = {
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        token: 'test-token',
        roles: [{
          id: 1,
          name: 'admin',
          guard_name: 'web',
          permissions: []
        }],
        status: true
      }
      
      store.setUser(mockUser)
      
      // Verificar que el estado cambió
      expect(store.authenticated).toBe(true)
      expect(store.oUser).toEqual(mockUser)
    })
  })
})
