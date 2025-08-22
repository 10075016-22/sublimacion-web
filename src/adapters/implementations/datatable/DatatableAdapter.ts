import type { IModelDatatable, IModelDatatableResponse, IModelHeaders, IModelHeadersResponse, IModelTable } from "@/adapters/interfaces/datatable/IModelDatatable";

export class DatatableAdapter {


//   static toModel(data: IModelDatatableResponse): IModelDatatable {
//     return {
        
//     };
//   }

  static toModelHeaders(data: IModelHeadersResponse[]): IModelHeaders[] {
    return data.map((item: IModelHeadersResponse) => {
      return {
        title: item.text,
        key:   item.value,
        sortable: item.sortable === 1,
        width: item.width || '',
        fixed: item.fixed === 1,
        align: item.alignment || 'start',
        order: item.order,
        component: item.type_field.name
      }
    })
  }

  static toModelTable(data: IModelDatatableResponse): IModelTable {
    return {
      id: data.id,
      table: data.table,
      descripcion: data.descripcion,
      endpoint: data.endpoint,
      icon: data.icon,
    }
  }
}