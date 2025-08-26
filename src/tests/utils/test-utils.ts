import { mount, type VueWrapper } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import type { ComponentMountingOptions } from '@vue/test-utils'

// Configuración de Vuetify para pruebas
export function createVuetifyInstance() {
  return createVuetify({
    components,
    directives
  })
}

// Configuración de Pinia para pruebas
export function createPiniaInstance() {
  return createPinia()
}

// Configuración de i18n para pruebas
export function createI18nInstance() {
  return createI18n({
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
}

// Función helper para montar componentes con todas las dependencias
export function mountComponent<T>(
  component: T,
  options: ComponentMountingOptions<T> = {}
): VueWrapper<T> {
  const vuetify = createVuetifyInstance()
  const pinia = createPiniaInstance()
  const i18n = createI18nInstance()

  return mount(component, {
    global: {
      plugins: [vuetify, pinia, i18n],
      stubs: {
        'router-link': true,
        'router-view': true
      }
    },
    ...options
  })
}

// Función helper para crear mocks de API
export function createApiMock() {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    postFile: vi.fn()
  }
}

// Función helper para crear datos de prueba
export function createTestUser() {
  return {
    id: 1,
    name: 'Usuario Test',
    email: 'test@example.com',
    token: 'test-token-123',
    role: 'SuperAdmin'
  }
}

// Función helper para esperar que las promesas se resuelvan
export function flushPromises() {
  return new Promise(resolve => setTimeout(resolve, 0))
}
