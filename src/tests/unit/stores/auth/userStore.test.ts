import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { userStore } from '@/store/auth/userStore'
import type { IModelUser } from '@/adapters/interfaces/IUser'

describe('userStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Limpiar localStorage para evitar que la persistencia interfiera
    localStorage.clear()
  })

  describe('Estado inicial', () => {
    it('debe tener una IP vacía inicialmente', () => {
      const store = userStore()
      expect(store.ip).toBe('')
    })
  })

  describe('setUser', () => {
    it('debe establecer un usuario correctamente', () => {
      const store = userStore()
      const mockUser: IModelUser = {
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        token: 'test-token',
        roles: [{
          id: 1,
          name: 'admin',
          guard_name: 'web',
          permissions: [{
            id: 1,
            name: 'read:users',
            guard_name: 'web',
            alias: 'read_users'
          }]
        }],
        status: true
      }

      store.setUser(mockUser)

      expect(store.oUser).toEqual(mockUser)
      expect(store.authenticated).toBe(true)
    })
  })

  describe('resetUser', () => {
    it('debe limpiar el usuario correctamente', () => {
      const store = userStore()
      const mockUser: IModelUser = {
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        token: 'test-token',
        roles: [{
          id: 1,
          name: 'admin',
          guard_name: 'web',
          permissions: [{
            id: 1,
            name: 'read:users',
            guard_name: 'web',
            alias: 'read_users'
          }]
        }],
        status: true
      }

      store.setUser(mockUser)
      expect(store.authenticated).toBe(true)

      store.resetUser()
      expect(store.oUser).toBeNull()
      expect(store.authenticated).toBe(false)
    })
  })

  describe('authenticated computed', () => {
    it('debe retornar true cuando hay un usuario', () => {
      const store = userStore()
      const mockUser: IModelUser = {
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        token: 'test-token',
        roles: [{
          id: 1,
          name: 'admin',
          guard_name: 'web',
          permissions: [{
            id: 1,
            name: 'read:users',
            guard_name: 'web',
            alias: 'read_users'
          }]
        }],
        status: true
      }

      store.setUser(mockUser)
      expect(store.authenticated).toBe(true)
    })
  })
})
