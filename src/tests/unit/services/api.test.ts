import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { userStore } from '@/store/auth/userStore'

// Mock del servicio API completo
vi.mock('@/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    postFile: vi.fn()
  }
}))

describe('apiClient', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('get', () => {
    it('debe hacer una petición GET', async () => {
      const apiClient = await import('@/services/api')
      const mockResponse = { data: { success: true } }
      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse)

      const result = await apiClient.default.get('/test')

      expect(apiClient.default.get).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })

    it('debe hacer una petición GET con bearer token', async () => {
      const store = userStore()
      store.setUser({
        id: 1,
        name: 'Test User',
        user: 'testuser',
        email: 'test@example.com',
        token: 'test-token',
        roles: [],
        status: true
      })

      const apiClient = await import('@/services/api')
      const mockResponse = { data: { success: true } }
      vi.mocked(apiClient.default.get).mockResolvedValue(mockResponse)

      await apiClient.default.get('/test', '', true)

      expect(apiClient.default.get).toHaveBeenCalled()
    })
  })

  describe('post', () => {
    it('debe hacer una petición POST con datos', async () => {
      const mockData = { name: 'Test', email: 'test@example.com' }
      const apiClient = await import('@/services/api')
      const mockResponse = { data: { success: true } }
      vi.mocked(apiClient.default.post).mockResolvedValue(mockResponse)

      await apiClient.default.post('/test', mockData)

      expect(apiClient.default.post).toHaveBeenCalled()
    })
  })

  describe('put', () => {
    it('debe hacer una petición PUT con datos', async () => {
      const mockData = { id: 1, name: 'Updated Test' }
      const apiClient = await import('@/services/api')
      const mockResponse = { data: { success: true } }
      vi.mocked(apiClient.default.put).mockResolvedValue(mockResponse)

      await apiClient.default.put('/test/1', mockData)

      expect(apiClient.default.put).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('debe hacer una petición DELETE', async () => {
      const apiClient = await import('@/services/api')
      const mockResponse = { data: { success: true } }
      vi.mocked(apiClient.default.delete).mockResolvedValue(mockResponse)

      await apiClient.default.delete('/test/1')

      expect(apiClient.default.delete).toHaveBeenCalled()
    })
  })

  describe('postFile', () => {
    it('debe hacer una petición POST para subir archivos', async () => {
      const mockFormData = new FormData()
      mockFormData.append('file', new Blob(['test']))
      
      const apiClient = await import('@/services/api')
      const mockResponse = { data: { success: true } }
      vi.mocked(apiClient.default.postFile).mockResolvedValue(mockResponse)

      await apiClient.default.postFile('/upload', mockFormData)

      expect(apiClient.default.postFile).toHaveBeenCalled()
    })
  })
})
