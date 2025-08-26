import { describe, it, expect } from 'vitest'
import { LoginAdapter } from '@/adapters/implementations/auth/LoginAdapter'

describe('LoginAdapter', () => {
  describe('toModel', () => {
    it('debe convertir datos de API a modelo de usuario correctamente', () => {
      const apiData = {
        id: 1,
        name: 'testuser',
        fullname: 'Test User',
        email: 'test@example.com',
        access_token: 'test-token-123',
        roles: [{
          id: 1,
          name: 'admin',
          permissions: []
        }],
        status: 1
      }

      const result = LoginAdapter.toModel(apiData)

      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        token: 'test-token-123',
        roles: [{
          id: 1,
          name: 'admin',
          permissions: []
        }],
        status: true
      })
    })

    it('debe manejar datos incompletos de la API', () => {
      const apiData = {
        id: 1,
        name: 'testuser',
        fullname: 'Test User'
        // email, access_token, roles, status faltantes
      }

      const result = LoginAdapter.toModel(apiData)

      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: undefined,
        token: undefined,
        roles: undefined,
        status: false
      })
    })

    it('debe manejar status como false cuando es 0', () => {
      const apiData = {
        id: 1,
        name: 'testuser',
        fullname: 'Test User',
        email: 'test@example.com',
        access_token: 'test-token',
        roles: [],
        status: 0
      }

      const result = LoginAdapter.toModel(apiData)

      expect(result.status).toBe(false)
    })

    it('debe manejar status como true cuando es 1', () => {
      const apiData = {
        id: 1,
        name: 'testuser',
        fullname: 'Test User',
        email: 'test@example.com',
        access_token: 'test-token',
        roles: [],
        status: 1
      }

      const result = LoginAdapter.toModel(apiData)

      expect(result.status).toBe(true)
    })
  })
})
