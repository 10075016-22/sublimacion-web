# Estructura de Pruebas

Este directorio contiene todas las pruebas del sistema organizadas por tipo y módulo.

## Estructura de Carpetas

```
src/tests/
├── setup.ts                    # Configuración global de Vitest
├── utils/
│   └── test-utils.ts          # Utilidades y helpers para pruebas
├── unit/                      # Pruebas unitarias
│   ├── stores/               # Pruebas de stores (Pinia)
│   │   └── auth/
│   │       └── userStore.test.ts
│   ├── composables/          # Pruebas de composables
│   │   └── auth/
│   │       └── cmp_Login.test.ts
│   └── services/             # Pruebas de servicios
│       └── api.test.ts
├── components/               # Pruebas de componentes Vue
│   └── auth/
│       └── Login.test.ts
├── integration/              # Pruebas de integración
│   └── auth/
│       └── LoginFlow.test.ts
└── e2e/                      # Pruebas end-to-end
    └── auth/
        └── LoginE2E.test.ts
```

## Tipos de Pruebas

### 1. Pruebas Unitarias (`unit/`)
- **Stores**: Prueban la lógica de estado de Pinia
- **Composables**: Prueban la lógica de composables Vue
- **Services**: Prueban servicios y utilidades

### 2. Pruebas de Componentes (`components/`)
- Prueban el renderizado y comportamiento de componentes Vue
- Verifican props, eventos, slots y validaciones

### 3. Pruebas de Integración (`integration/`)
- Prueban la interacción entre múltiples componentes
- Verifican flujos completos de funcionalidad

### 4. Pruebas E2E (`e2e/`)
- Prueban la experiencia completa del usuario
- Verifican accesibilidad y responsive design

## Configuración

### Dependencias
- **Vitest**: Framework de pruebas
- **@vue/test-utils**: Utilidades para testing de Vue
- **jsdom**: Entorno DOM para pruebas
- **@vitest/coverage-v8**: Cobertura de código

### Configuración en `vite.config.ts`
```typescript
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/tests/setup.ts']
}
```

## Scripts de Pruebas

```bash
# Ejecutar todas las pruebas en modo watch
npm run test

# Ejecutar pruebas una sola vez
npm run test:run

# Ejecutar pruebas con interfaz gráfica
npm run test:ui

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Convenciones de Nomenclatura

### Archivos de Pruebas
- Nombres en formato: `[nombre].test.ts`
- Ubicación: Misma estructura que el código fuente

### Descripción de Pruebas
- Usar `describe` para agrupar pruebas relacionadas
- Usar `it` para casos de prueba individuales
- Descripciones en español y descriptivas

### Ejemplo
```typescript
describe('userStore', () => {
  describe('setUser', () => {
    it('debe establecer un usuario correctamente', () => {
      // prueba aquí
    })
  })
})
```

## Utilidades de Pruebas

### `test-utils.ts`
Contiene funciones helper para:
- Montar componentes con todas las dependencias
- Crear mocks de API
- Crear datos de prueba
- Manejar promesas

### Ejemplo de uso
```typescript
import { mountComponent, createApiMock } from '@/tests/utils/test-utils'

const wrapper = mountComponent(MyComponent)
const apiMock = createApiMock()
```

## Mocks y Stubs

### Mocks Comunes
- **Vue Router**: Mock de navegación
- **Vue I18n**: Mock de traducciones
- **API Services**: Mock de llamadas HTTP
- **Pinia Stores**: Mock de estado

### Ejemplo de Mock
```typescript
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))
```

## Cobertura de Código

### Configuración
- Proveedor: `v8`
- Reportes: `text`, `json`, `html`
- Excluir: `node_modules`, `tests`, `configs`

### Comandos
```bash
# Ver cobertura en terminal
npm run test:coverage

# Ver reporte HTML
open coverage/index.html
```

## Mejores Prácticas

### 1. Organización
- Mantener estructura de carpetas consistente
- Agrupar pruebas relacionadas
- Usar nombres descriptivos

### 2. Aislamiento
- Cada prueba debe ser independiente
- Limpiar estado entre pruebas
- Usar `beforeEach` y `afterEach`

### 3. Mocks
- Mockear dependencias externas
- Usar mocks específicos para cada prueba
- Evitar mocks innecesarios

### 4. Aserciones
- Una aserción por prueba cuando sea posible
- Usar aserciones específicas
- Verificar comportamiento, no implementación

### 5. Performance
- Evitar pruebas lentas
- Usar mocks para operaciones costosas
- Optimizar configuración de Vitest

## Troubleshooting

### Problemas Comunes

1. **Error de configuración de Vuetify**
   - Verificar que `createVuetify` esté configurado en `setup.ts`

2. **Error de Pinia**
   - Usar `setActivePinia(createPinia())` en `beforeEach`

3. **Error de Vue Router**
   - Mockear `useRouter` en pruebas unitarias

4. **Error de i18n**
   - Configurar mensajes de prueba en `setup.ts`

### Debugging
```bash
# Ejecutar pruebas con debug
npm run test -- --reporter=verbose

# Ejecutar una prueba específica
npm run test -- Login.test.ts
```

## Contribución

Al agregar nuevas pruebas:
1. Seguir la estructura de carpetas existente
2. Usar las utilidades de `test-utils.ts`
3. Documentar casos de prueba complejos
4. Mantener cobertura de código alta
