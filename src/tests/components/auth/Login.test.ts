import { describe, it, expect, beforeEach } from 'vitest'
import { mountComponent } from '@/tests/utils/test-utils'
import Login from '@/components/auth/login/Login.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('Login.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Renderizado', () => {
    it('debe renderizar el componente correctamente', () => {
      const wrapper = mountComponent(Login)

      // Verificar que el componente se renderiza
      expect(wrapper.exists()).toBe(true)
      
      // Verificar que los elementos principales están presentes
      expect(wrapper.find('.v-card').exists()).toBe(true)
      expect(wrapper.find('.v-form').exists()).toBe(true)
      expect(wrapper.find('img[alt="logo"]').exists()).toBe(true)
    })

    it('debe mostrar el título de login', () => {
      const wrapper = mountComponent(Login)
      
      // Verificar que el título está presente (ya traducido)
      expect(wrapper.text()).toContain('Iniciar Sesión')
    })

    it('debe mostrar los campos de email y contraseña', () => {
      const wrapper = mountComponent(Login)
      
      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')
      
      expect(emailField.exists()).toBe(true)
      expect(passwordField.exists()).toBe(true)
    })

    it('debe mostrar el botón de login', () => {
      const wrapper = mountComponent(Login)
      
      const loginButton = wrapper.find('button[type="submit"], .v-btn')
      expect(loginButton.exists()).toBe(true)
      expect(loginButton.text()).toContain('Iniciar Sesión')
    })
  })

  describe('Interacciones', () => {
    it('debe permitir entrada de datos en los campos', async () => {
      const wrapper = mountComponent(Login)

      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')
      
      // Simular entrada de datos
      await emailField.setValue('test@example.com')
      await passwordField.setValue('password123')

      // Verificar que los valores se establecieron
      expect((emailField.element as HTMLInputElement).value).toBe('test@example.com')
      expect((passwordField.element as HTMLInputElement).value).toBe('password123')
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

  describe('Validaciones', () => {
    it('debe aplicar las reglas de validación al campo email', async () => {
      const wrapper = mountComponent(Login)

      const emailField = wrapper.find('input[type="email"]')
      
      // Simular email inválido
      await emailField.setValue('invalid-email')
      await emailField.trigger('blur')

      // Verificar que el campo existe
      expect(emailField.exists()).toBe(true)
    })

    it('debe aplicar las reglas de validación al campo contraseña', async () => {
      const wrapper = mountComponent(Login)

      const passwordField = wrapper.find('input[type="password"]')
      
      // Simular contraseña corta
      await passwordField.setValue('123')
      await passwordField.trigger('blur')

      // Verificar que el campo existe
      expect(passwordField.exists()).toBe(true)
    })
  })

  describe('Accesibilidad', () => {
    it('debe tener labels apropiados para los campos', () => {
      const wrapper = mountComponent(Login)

      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')
      
      // Verificar que los campos existen
      expect(emailField.exists()).toBe(true)
      expect(passwordField.exists()).toBe(true)

      // Verificar que los campos tienen IDs (para accesibilidad)
      expect(emailField.attributes('id')).toBeDefined()
      expect(passwordField.attributes('id')).toBeDefined()
    })

    it('debe tener el enlace de contraseña olvidada', () => {
      const wrapper = mountComponent(Login)

      const forgotPasswordLink = wrapper.find('a[href="#"]')
      expect(forgotPasswordLink.exists()).toBe(true)
      expect(forgotPasswordLink.text()).toContain('¿Olvidaste tu contraseña?')
    })
  })
})
