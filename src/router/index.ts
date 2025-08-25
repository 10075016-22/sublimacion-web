import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { userStore } from '@/store/auth/userStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/components/auth/login/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/HomeView.vue')
  },
  {
    path: '/dashboard/usuarios',
    name: 'usuarios',
    component: () => import('@/views/usuarios/Usuarios.vue')
  },
  {
    path: '/dashboard/clientes',
    name: 'clientes',
    component: () => import('@/views/clientes/Clientes.vue')
  },  
  {
    path: '/dashboard/proveedores',
    name: 'proveedores',
    component: () => import('@/views/proveedores/Proveedores.vue')
  },
  {
    path: '/dashboard/productos',
    name: 'productos',
    component: () => import('@/views/productos/Productos.vue')
  },  
  {
    path: '/dashboard/stock',
    name: 'stock',
    component: () => import('@/views/stock/Stock.vue')
  },
  {
    path: '/dashboard/compras',
    name: 'compras',
    component: () => import('@/views/compras/Compras.vue')
  },  
  {
    path: '/dashboard/reportes',
    name: 'reportes',
    component: () => import('@/views/reportes/Reportes.vue')
  },
  {
    path: '/dashboard/ventas',
    name: 'ventas',
    component: () => import('@/views/ventas/Ventas.vue')
  },
  {
    path: '/dashboard/configuracion',
    name: 'configuracion',
    component: () => import('@/views/configuracion/Configuracion.vue')
  },
  {
    path: '/dashboard/tiposcliente',
    name: 'tiposcliente',
    component: () => import('@/views/tipos-cliente/TiposCliente.vue')
  },
  {
    path: '/dashboard/categoriasproducto',
    name: 'categoriasproducto',
    component: () => import('@/views/categorias-producto/CategoriasProducto.vue')
  },
  {
    path: '/dashboard/categoriasproveedor',
    name: 'categoriasproveedor',
    component: () => import('@/views/categorias-proveedor/CategoriasProveedor.vue')
  },
  {
    path: '/dashboard/tipostransaccion',
    name: 'tipostransaccion',
    component: () => import('@/views/tipos-transaccion/TiposTransaccion.vue')
  },
  {
    path: '/dashboard/perfiles',
    name: 'perfiles',
    component: () => import('@/views/perfiles/Perfiles.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
    const { authenticated } = userStore()
    if (to.name !== 'Login' && !authenticated) {
      return { name: 'Login' }
    }
    // Si estamos en el login y hay sesion activa, lo mandamos al dashboard
    if (to.name === 'Login' && authenticated) {
      return { name: 'dashboard' }
    }
})

export default router