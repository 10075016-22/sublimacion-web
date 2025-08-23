<template>
  <v-app :class="[!authenticated ? 'bg-login' : '']">
    <UIMenu v-if="authenticated" />
    <v-main>
      <UIHeader v-if="authenticated" />
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from "pinia";
import { useTheme } from 'vuetify'


import { navigationStore } from '@/store/general/navigationStore'


// components
import UIMenu from '@/components/layout/UIMenu.vue'
import UIHeader from '@/components/layout/UIHeader.vue'

import { userStore } from '@/store/auth/userStore'

const theme = useTheme()
const { ip, authenticated } = storeToRefs(userStore())

const { bDark } = storeToRefs(navigationStore())

onMounted(() => {
  theme.change(bDark.value ? 'dark' : 'light')

  window.RTCPeerConnection = window.RTCPeerConnection || false
  if (window.RTCPeerConnection) {
    var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { }
    pc.createDataChannel('');
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);
    pc.onicecandidate = function (event) {
      if (event && event.candidate && event.candidate.candidate) {
        var s = event.candidate.candidate.split('\n');
        ip.value = s[0].split(' ')[4];
      }
    }
  }
})
</script>
<style>
.v-card {
  border-radius: 0 !important;
  border-color: #E0E0E0 !important;
}
.bg-login {
  background-image: url('@/assets/images/background.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
}
</style>