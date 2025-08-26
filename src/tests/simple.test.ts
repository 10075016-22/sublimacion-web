import { describe, it, expect } from 'vitest'

describe('Configuración básica', () => {
  it('debe funcionar correctamente', () => {
    expect(true).toBe(true)
  })

  it('debe poder hacer operaciones matemáticas', () => {
    expect(2 + 2).toBe(4)
  })
})
