import type { IModelCardDashboard, IModelCardDashboardResponse } from "@/adapters/interfaces/dashboard/IModelDashboard"

export class DashboardAdapter {
  static toModelCardDashboard(data: IModelCardDashboardResponse[]): IModelCardDashboard[] {
    return data.map((item: IModelCardDashboardResponse) => {
      return {
        id: item.id,
        title: item.title,
        icon: item.icon,
        value: item.count,
        percentage: Number(item.percentage)
      }
    })
  }
}