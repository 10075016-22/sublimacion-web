import config from '@/config/index'
import axios, { type AxiosResponse } from 'axios'

// importamos la interfaz de la api
import type { ApiConfig, ApiResponse, QueryParams } from '@/types/services/api'

// importamos el store de autenticación
import { userStore } from '@/store/auth/userStore'
import { navigationStore } from '@/store/general/navigationStore.ts'

import { storeToRefs } from 'pinia'


// importamos la interfaz de la api
const apiClient = axios.create({
  baseURL: config.path,
  headers: {
    'Content-Type': 'application/json'
  }
})

const oConfigBase: ApiConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}

const oConfigFile: ApiConfig = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

apiClient.interceptors.request.use(config => { 
  return config
})

apiClient.interceptors.response.use((response: AxiosResponse<ApiResponse>) => {
  return response
}, (error) => {
  const { resetUser } = userStore()
  if(error.response.status === 401) {
    // El usuario pasa a su estado inicial
    console.log("Error 401");
    
    resetUser()
    // Se limpia el localStorage
    localStorage.clear()

    let { location } = window
    location.href = location.origin
  }
  return Promise.reject(error)
})


const onValidarToken = (token: string): string | null => {
  const { oUser } = storeToRefs(userStore())
  let sToken: string | null = oUser.value?.token ?? null

  try {
    // Validar si existe en la URL
    const uri: string[] = window.location.href.split('?')
    
    if (uri.length === 2) {
      const aVars: string[] = uri[1].split('&')
      const oGetVars: QueryParams = {}
      
      aVars.forEach((v: string) => {
        const [key, value] = v.split('=')
        if (key && value) {
          oGetVars[key] = value
        }
      })

      // Validar si existe el token en la URL
      if (oGetVars.t) {
        sToken = oGetVars.t
      }
    } else {
      // Si no hay token en la URL, usar el del usuario
      if (oUser.value?.token) {
        sToken = oUser.value.token
      }
    }

    return sToken
  } catch (error) {
    return null
  }
}

export default {
  // Métodos GET
  get(url: string, params: string = '', bearer: boolean = false, token: string = '') {

    const { ip, oUser } = storeToRefs(userStore())
    let sComplementURL = `?ip=${ip.value}&v=${new Date().getTime()}`;

    if (params) {
      sComplementURL += `&${params}`
    }

    const config = { ...oConfigBase }
    if (bearer) {
      if(token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        const sToken = onValidarToken(oUser.value?.token ?? '')
        config.headers.Authorization = `Bearer ${sToken}`
      }
    }
    return apiClient.get(`${url}${sComplementURL}`, config)
      .then(response => response.data)
  },

  // Métodos POST
  post(url: string, data: any, params: string = '', bearer: boolean = false, tokenTemporal: string = '') {

    const { ip, oUser } = storeToRefs(userStore())
    let sComplementURL = `?ip=${ip.value}&v=${new Date().getTime()}`;

    const config = { ...oConfigBase }
    if (bearer) {
      if(tokenTemporal) {
        config.headers.Authorization = `Bearer ${tokenTemporal}`
      } else {
        const sToken = onValidarToken(oUser.value?.token ?? '')
        config.headers.Authorization = `Bearer ${sToken}`
      }
    }

    if (params) {
      sComplementURL += `&${params}`
    }

    return apiClient.post(`${url}${sComplementURL}`, data, config)
      .then(response => response.data)
  },

  // Método PUT
  put(url: string, data: any, params: string = '', bearer: boolean = false, tokenTemporal: string = '') {
    const { ip, oUser } = storeToRefs(userStore())
    let sComplementURL = `?ip=${ip.value}&v=${new Date().getTime()}`;

    if (params) {
      sComplementURL += `&${params}`
    }

    const config = { ...oConfigBase }
    if (bearer) {
      if(tokenTemporal) {
        config.headers.Authorization = `Bearer ${tokenTemporal}`
      } else {
        const sToken = onValidarToken(oUser.value?.token ?? '')
        config.headers.Authorization = `Bearer ${sToken}`
      }
    }
    return apiClient.put(`${url}${sComplementURL}`, data, config)
      .then(response => response.data)
  },

  // Método DELETE
  delete(url: string, data: any = {}, params: string = '', bearer: boolean = false, tokenTemporal: string = '') {
    const { ip, oUser } = storeToRefs(userStore())
    let sComplementURL = `?ip=${ip.value}&v=${new Date().getTime()}`;

    if (params) {
      sComplementURL += `&${params}`
    }

    const config = { ...oConfigBase }
    if (bearer) {
      if(tokenTemporal) {
        config.headers.Authorization = `Bearer ${tokenTemporal}`
      } else {
        const sToken = onValidarToken(oUser.value?.token ?? '')
        config.headers.Authorization = `Bearer ${sToken}`
      }
    }
    if (Object.keys(data).length > 0) {
      config.data = data
    }
    return apiClient.delete(`${url}${sComplementURL}`, config)
      .then(response => response.data)
  },

  // Método para subir archivos
  postFile(url: string, formData: FormData, bearer: boolean = false, nTipoAnexo: number = 1) {
    const { ip, oUser } = storeToRefs(userStore())
    let sComplementURL = `?ip=${ip.value}&v=${new Date().getTime()}`;


    const config = { ...oConfigFile }
    if (bearer) { 
      config.headers.Authorization = `Bearer ${oUser.value?.token}`
    }
    return apiClient.post(`${url}${sComplementURL}`, formData, config)
      .then(response => response.data)
      .catch(error => {
        error;
        return []
      })
  }
}
