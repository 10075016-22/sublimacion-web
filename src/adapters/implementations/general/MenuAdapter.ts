import type { IModelModule, IModelModuleResponse } from "@/adapters/interfaces/IModule";

export class MenuAdapter {


  static toModel(data: IModelModuleResponse): IModelModule {
    return {
      id: data.id,
      name: data.module,
      description: data.description,
      icon: data.icon,
      path: data.name,
      order: data.order,
      status: data.status === 1,
      divider: data.divider === 1
    };
  }
}