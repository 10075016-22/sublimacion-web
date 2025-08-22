<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" style="height: 68vh;">
      <v-col cols="12" sm="8" md="5" lg="4" xl="3">
        <v-card class="pa-5" elevation="2">
          <v-card-title>{{ $t('LOGIN.TITLE_LOGIN') }}</v-card-title>
          <v-card-text>
            <v-form ref="formRef" v-model="isValid">
              <v-text-field
                class="my-5"
                :label="$t('LOGIN.LABEL_USER')"
                :placeholder="$t('LOGIN.PLACEHOLDER_USER')"
                type="email"
                required
                variant="outlined"
                density="compact"
                autocomplete="off"
                :rules="ruleUser"
                v-model="formData.email"
              />
              <v-text-field
                :label="$t('LOGIN.LABEL_PASS')"
                :placeholder="$t('LOGIN.PLACEHOLDER_PASS')"
                :append-inner-icon="'mdi-eye-off'"
                :rules="rulePassword"
                type="password"
                required
                variant="outlined"
                density="compact"
                class="mb-2"
                v-model="formData.password"
              />
              <div class="d-flex justify-end mb-8">
                <a href="#" class="text-caption">{{ $t('LOGIN.FORGOT_PASSWORD') }}</a>
              </div>
              <v-btn color="primary" block :loading="isLoading" class="mb-6" @click="handleLogin">
                {{ $t('BUTTON.LOGIN') }}
              </v-btn>
            </v-form>
            <div class="text-center mt-8">
              <span class="mr-1">{{ $t('LOGIN.CREATE_ACCOUNT') }}</span>
              <a href="#" class="text-primary text-decoration-underline">{{ $t('LOGIN.CREATE_ACCOUNT_LINK') }}</a>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { cmpLogin } from '@/composables/auth/cmp_Login'

const { 
  isValid,
  ruleUser,
  rulePassword,
  formData,
  formRef,
  isLoading,


  handleLogin
} = cmpLogin()
</script>
<style lang="scss" scoped>
.fill-height {
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>