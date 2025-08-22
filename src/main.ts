import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import 'vuetify/styles'
import { vuetify } from '@/plugins/vuetify'


// pinia
import { createPinia } from 'pinia'
// persistencia
import { createPersistedState } from 'pinia-plugin-persistedstate'

// configuration persistencia
const pinia = createPinia()
pinia.use(createPersistedState())

// i18n
import { createI18n } from 'vue-i18n'
import { defaultLanguage, languages } from './I18n'

const i18n = createI18n({
    legacy: false,
    locale: defaultLanguage,
    fallbackLocale: defaultLanguage,
    messages: languages
})

// Notificacion global component
import Notification from '@/components/common/Notification.vue'
import WithOutPermission from '@/components/common/WithOutPermission.vue'
import Datatable from '@/components/datatable/Datatable.vue'

const app = createApp(App)

// register global component
app.component('Notification', Notification)
    .component('WithOutPermission', WithOutPermission)
    .component('Datatable', Datatable)


app.use(vuetify)
   .use(router)
   .use(pinia)
   .use(i18n)
   .mount('#app')
