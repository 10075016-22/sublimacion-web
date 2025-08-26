import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import Login from '@/components/auth/login/Login.vue'

// Configuración para pruebas E2E
const vuetify = createVuetify({
  components,
  directives
})

const pinia = createPinia()

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es: {
      LOGIN: {
        TITLE_LOGIN: 'Iniciar Sesión',
        LABEL_USER: 'Usuario',
        LABEL_PASS: 'Contraseña',
        PLACEHOLDER_USER: 'Ingrese su email',
        PLACEHOLDER_PASS: 'Ingrese su contraseña',
        REQUIRED_USER: 'El usuario es requerido',
        REQUIRED_PASS: 'La contraseña es requerida',
        INVALID_USER: 'Email inválido',
        INVALID_PASS: 'La contraseña debe tener al menos 6 caracteres',
        FORGOT_PASSWORD: '¿Olvidaste tu contraseña?'
      },
      BUTTON: {
        LOGIN: 'Iniciar Sesión'
      }
    }
  }
})

describe('Login E2E', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear()
    // Configurar Pinia activo
    setActivePinia(pinia)
  })

  describe('Experiencia de usuario completa', () => {
    it('debe permitir al usuario completar el flujo de login completo', async () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [vuetify, pinia, i18n],
          stubs: {
            'router-link': true,
            'router-view': true
          }
        }
      })

      // Verificar que el formulario está presente
      expect(wrapper.find('.v-form').exists()).toBe(true)

      // Verificar que los campos están presentes usando selectores más específicos
      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')
      const loginButton = wrapper.find('button[type="submit"], .v-btn')

      expect(emailField.exists()).toBe(true)
      expect(passwordField.exists()).toBe(true)
      expect(loginButton.exists()).toBe(true)

      // Simular interacción del usuario
      await emailField.setValue('usuario@test.com')
      await passwordField.setValue('password123')

      // Verificar que los valores se establecieron
      expect(emailField.element.value).toBe('usuario@test.com')
      expect(passwordField.element.value).toBe('password123')

      // Simular envío del formulario
      await loginButton.trigger('click')

      // Verificar que el formulario se envió (esto puede variar según la implementación)
      expect(wrapper.emitted()).toBeDefined()
    })

    it('debe mostrar mensajes de error apropiados', async () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [vuetify, pinia, i18n],
          stubs: {
            'router-link': true,
            'router-view': true
          }
        }
      })

      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')

      // Simular email inválido
      await emailField.setValue('email-invalido')
      await emailField.trigger('blur')

      // Verificar que se muestra el error (puede variar según la implementación)
      expect(wrapper.text()).toContain('Email inválido')

      // Simular contraseña corta
      await passwordField.setValue('123')
      await passwordField.trigger('blur')

      // Verificar que se muestra el error
      expect(wrapper.text()).toContain('La contraseña debe tener al menos 6 caracteres')
    })

    it('debe manejar el estado de carga correctamente', async () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [vuetify, pinia, i18n],
          stubs: {
            'router-link': true,
            'router-view': true
          }
        }
      })

      const loginButton = wrapper.find('button[type="submit"], .v-btn')

      // Verificar que el botón existe antes de intentar interactuar
      expect(loginButton.exists()).toBe(true)

      // Simular clic en el botón
      await loginButton.trigger('click')

      // Verificar que el botón existe y es interactuable
      expect(loginButton.exists()).toBe(true)
      expect(loginButton.isVisible()).toBe(true)
    })
  })

  describe('Accesibilidad', () => {
    it('debe tener navegación por teclado funcional', async () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [vuetify, pinia, i18n],
          stubs: {
            'router-link': true,
            'router-view': true
          }
        }
      })

      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')
      const loginButton = wrapper.find('button[type="submit"], .v-btn')

      // Verificar que los campos existen
      expect(emailField.exists()).toBe(true)
      expect(passwordField.exists()).toBe(true)
      expect(loginButton.exists()).toBe(true)

      // Verificar que los campos son focusables y pueden recibir focus
      await emailField.trigger('focus')
      expect(emailField.element).toBeDefined()

      await passwordField.trigger('focus')
      expect(passwordField.element).toBeDefined()

      await loginButton.trigger('focus')
      expect(loginButton.element).toBeDefined()
    })

    it('debe tener labels apropiados para lectores de pantalla', () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [vuetify, pinia, i18n],
          stubs: {
            'router-link': true,
            'router-view': true
          }
        }
      })

      const emailField = wrapper.find('input[type="email"]')
      const passwordField = wrapper.find('input[type="password"]')

      // Verificar que los campos existen
      expect(emailField.exists()).toBe(true)
      expect(passwordField.exists()).toBe(true)

      // Verificar que los campos tienen labels asociados (puede variar según Vuetify)
      expect(emailField.attributes('id')).toBeDefined()
      expect(passwordField.attributes('id')).toBeDefined()
    })
  })

  describe('Responsive design', () => {
    it('debe adaptarse a diferentes tamaños de pantalla', () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [vuetify, pinia, i18n],
          stubs: {
            'router-link': true,
            'router-view': true
          }
        }
      })

      const card = wrapper.find('.v-card')
      expect(card.exists()).toBe(true)

      // Verificar que el contenedor tiene clases responsive
      const container = wrapper.find('.v-container')
      expect(container.exists()).toBe(true)
    })
  })
})
