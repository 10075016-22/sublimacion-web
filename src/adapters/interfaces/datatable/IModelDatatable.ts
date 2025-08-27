// response

interface IModelTypeField {
    id: number;
    name: string;
    description: string;
    icon: string;
    color: string;
}

export interface IModelHeadersResponse {
    id: number;
    table_id: number;
    text: string;
    value: string;
    sortable: number;
    width: string | null;
    fixed: number;
    alignment: string | null;
    order: number;
    type_field: IModelTypeField;
    color: string;
}

export interface IModelDatatableResponse {
    id: number;
    table: string;
    descripcion: string;
    endpoint: string;
    icon: string;
    headers: IModelHeadersResponse[];
}

export interface IModelDatatableResponse {
    id: number;
    table: string;
    descripcion: string;
    endpoint: string;
    icon: string;
    headers: IModelHeadersResponse[];
}

// use interfaces
export interface IModelHeaders {
    title: string;
    key: string;
    sortable: boolean;
    width: string;
    fixed: boolean;
    align: string;
    order: number;
    component: string;
    children?: IModelHeaders[];
    color: string | null;
}

export interface IModelTable {
    id: number;
    table: string;
    descripcion: string;
    endpoint: string;
    icon: string;
}

export interface IModelDatatable {
    table: IModelTable;
    headers: IModelHeaders[];
}

export interface IPropsDatatable {
    idTable: number;
    groupBy?: {key: string; order: 'asc' | 'desc'}[];
    subDatatable?: boolean;
    nuevo?: boolean;
    campoFiltro?: string;
    valorFiltro?: string | number | boolean;
    customColumn?: boolean;
}

export interface IFetchData {
    page: number;
    itemsPerPage: number;
    sortBy: {key: keyof any; order: 'asc' | 'desc'}[];
}

export interface IModelActionsResponse {
    id: number;
    message: string;
    order: number;
    type_field: IModelTypeField;
}