<template>
  <v-row v-if="isLoading || !hasPermission('Home')">
    <v-col>
      <v-skeleton-loader type="card@2" />
    </v-col>
  </v-row>
  <v-container v-else>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-card-text>
            <h5 class="text-h4 mb-1 font-weight-semibold">
              {{ $t("GENERAL.WELCOME_TEXT") }}
            </h5>
            <p class="text-subtitle-1">
              {{ $t("GENERAL.WELCOME", { name: oUser?.name }) }}
            </p>
            <v-divider class="my-4" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!isLoadingCard && hasPermission('home-cards')">
      <template v-for="item in aCard" :key="item">
        <v-col xl="3" lg="3" md="6" sm="12" v-if="hasPermission('home-cards')">
          <BaseCard
            :title="item.title"
            :icon="item.icon"
            :value="item.value"
            :percentage="item.percentage"
          />
        </v-col>
        <v-col xl="3" lg="3" md="6" sm="12" v-else>
          <v-skeleton-loader type="card" />
        </v-col>
      </template>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="transparent">
            <v-spacer />
            <v-btn icon color="primary" @click="onRefresh">
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row v-if="!isLoadingChart">
              <template v-for="(chart, index) in aChart" :key="index">
                <v-col v-if="hasPermission(chart.permission)" :cols="chart.cols">
                  <v-card>
                    <v-card-text>
                      <BaseChart :chart="chart" />
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>
            </v-row>
            <v-row v-else>
              <v-col>
                <v-skeleton-loader type="card@2" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import BaseChart from '@/views/dashboard/components/BaseChart.vue'
import BaseCard from '@/views/dashboard/components/BaseCard.vue'

import { DashboardAdapter } from '@/adapters/implementations/dashboard/DashboardAdapter'
import type { IModelChart } from '@/types/general/IChart'
import type { IModelCardDashboard } from '@/adapters/interfaces/dashboard/IModelDashboard'

import type { ApiResponse } from '@/types/services/api'

import apiClient from '@/services/api'

import { PermissionUtil } from '@/utils/PermissionUtil'

import { userStore } from '@/store/auth/userStore'

const { oUser } = storeToRefs(userStore())

const { hasPermission } = PermissionUtil()

const isLoading = ref<boolean>(false)
const isLoadingCard = ref<boolean>(false)
const isLoadingChart = ref<boolean>(false)

const aCard = ref<IModelCardDashboard[]>([])
const aChart = ref<IModelChart[]>([])

const onRefresh = async () => {
  await onGetCards()
  await onGetCharts()
}

const onGetCharts = async () => {
  try {
    isLoadingChart.value = true
    const response: ApiResponse = await apiClient.get('/v1/dashboard/charts', '', true)
    aChart.value = response.data.map((item: IModelChart) => {
      return {
        type: item.type,
        cols: item.cols,
        data: item.data,
        options: item.options,
        permission: item.permission
      }
    })
  } catch (error) {
    console.log({ error });
  } finally {
    isLoadingChart.value = false
  }
}

const onGetCards = async () => {
  try {
    isLoadingCard.value = true
    const response: ApiResponse = await apiClient.get('/v1/dashboard/cards', '', true)
    aCard.value = DashboardAdapter.toModelCardDashboard(response.data)
  } catch (error) {
    console.log({ error });
  } finally {
    isLoadingCard.value = false
  }
}

onMounted(() => {
  onGetCards()
  onGetCharts()
})

</script>