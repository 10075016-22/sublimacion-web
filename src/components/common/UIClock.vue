<template>
  <div class="d-flex align-center">
    <v-icon size="20" class="mr-1" color="primary">mdi-clock-outline</v-icon>
    <span class="text-body-2 font-mono">{{ time }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'

const time = ref<string>('')

function updateTime() {
  time.value = moment().format('HH:mm:ss')
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.font-mono {
  font-family: 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', monospace;
}
</style>