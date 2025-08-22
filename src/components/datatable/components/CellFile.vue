<template>
  <div>
    <v-btn variant="text" @click="openFile" :disabled="!fileUrl" icon size="small">
      <v-icon :color="getFileColor()">
        {{ getFileIcon() }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import type { IModelCell } from '@/adapters/interfaces/datatable/IModelCell'
import { computed } from 'vue'

const props = defineProps<IModelCell>()

const fileUrl = computed(() => {
  const value = props.item[props.field]
  return value || null
})

const getFileName = () => {
  if (!fileUrl.value) return 'Sin archivo'
  
  // Si es una URL completa, extraer el nombre del archivo
  if (typeof fileUrl.value === 'string') {
    const url = new URL(fileUrl.value)
    const pathParts = url.pathname.split('/')
    return pathParts[pathParts.length - 1] || 'Archivo'
  }
  
  return 'Archivo'
}

const getFileExtension = () => {
  if (!fileUrl.value) return ''
  
  const fileName = getFileName()
  const extension = fileName.split('.').pop()?.toLowerCase()
  return extension || ''
}

const getFileIcon = () => {
  const extension = getFileExtension()
  
  switch (extension) {
    case 'pdf':
      return 'mdi-file-pdf-box'
    case 'doc':
    case 'docx':
      return 'mdi-file-word-box'
    case 'xls':
    case 'xlsx':
      return 'mdi-file-excel-box'
    case 'ppt':
    case 'pptx':
      return 'mdi-file-powerpoint-box'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return 'mdi-file-image'
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
      return 'mdi-file-video-box'
    case 'mp3':
    case 'wav':
    case 'flac':
      return 'mdi-file-music-box'
    case 'zip':
    case 'rar':
    case '7z':
      return 'mdi-folder-zip'
    case 'txt':
      return 'mdi-file-document'
    default:
      return 'mdi-file'
  }
}

const getFileColor = () => {
  const extension = getFileExtension()
  
  switch (extension) {
    case 'pdf':
      return 'red'
    case 'doc':
    case 'docx':
      return 'blue'
    case 'xls':
    case 'xlsx':
      return 'green'
    case 'ppt':
    case 'pptx':
      return 'orange'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return 'purple'
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
      return 'pink'
    case 'mp3':
    case 'wav':
    case 'flac':
      return 'teal'
    case 'zip':
    case 'rar':
    case '7z':
      return 'brown'
    case 'txt':
      return 'grey'
    default:
      return 'primary'
  }
}

const openFile = () => {
  if (fileUrl.value) {
    window.open(fileUrl.value, '_blank')
  }
}
</script>