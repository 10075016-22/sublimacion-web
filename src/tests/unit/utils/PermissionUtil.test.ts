import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { PermissionUtil } from '@/utils/PermissionUtil'
import { userStore } from '@/store/auth/userStore'

describe('PermissionUtil', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('hasPermission', () => {
    it('debe retornar true cuando el usuario tiene el permiso requerido', () => {
      const store = userStore()
      store.setUser({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        roles: [{
          id: 1,
          name: 'admin',
          permissions: [{
            id: 1,
            name: 'read:users'
          }]
        }],
        token: 'test-token',
        status: true
      })

      const permissionUtil = PermissionUtil()
      const result = permissionUtil.hasPermission('read:users')

      expect(result).toBe(true)
    })

    it('debe retornar false cuando el usuario no tiene el permiso requerido', () => {
      const store = userStore()
      store.setUser({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        roles: [{
          id: 1,
          name: 'user',
          permissions: [{
            id: 1,
            name: 'read:users'
          }]
        }],
        token: 'test-token',
        status: true
      })

      const permissionUtil = PermissionUtil()
      const result = permissionUtil.hasPermission('delete:users')

      expect(result).toBe(false)
    })

    it('debe retornar false cuando no hay usuario', () => {
      const permissionUtil = PermissionUtil()
      const result = permissionUtil.hasPermission('read:users')

      expect(result).toBe(false)
    })
  })

  describe('hasPermissionById', () => {
    it('debe retornar true cuando el usuario tiene el permiso por ID', () => {
      const store = userStore()
      store.setUser({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        roles: [{
          id: 1,
          name: 'admin',
          permissions: [{
            id: 1,
            name: 'read:users'
          }]
        }],
        token: 'test-token',
        status: true
      })

      const permissionUtil = PermissionUtil()
      const result = permissionUtil.hasPermissionById(1)

      expect(result).toBe(true)
    })

    it('debe retornar false cuando el usuario no tiene el permiso por ID', () => {
      const store = userStore()
      store.setUser({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        roles: [{
          id: 1,
          name: 'user',
          permissions: [{
            id: 1,
            name: 'read:users'
          }]
        }],
        token: 'test-token',
        status: true
      })

      const permissionUtil = PermissionUtil()
      const result = permissionUtil.hasPermissionById(999)

      expect(result).toBe(false)
    })
  })
})
