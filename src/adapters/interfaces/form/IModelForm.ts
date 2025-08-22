export interface IFormProps {
    show: boolean; // Indica si el formulario debe mostrarse o no
    title: string; // Titulo del formulario
    idTable: number; // ID de la tabla asociada al formulario
    endpoint: string; // endpoint de la datatable (usaremos el metodo post o put dependiendo el caso)
}

export interface ITypeField {
    id: number; // ID del tipo de campo
    name: string; // Nombre del tipo de campo
    description: string; // Descripción del tipo de campo
}
export interface IModelFormResponse {
    id: number; // ID del campo del formulario
    field_name: string;
    label: string;
    size: number;
    required: number;
    order: number;
    visible: number;
    editable: number;
    filter_field: number;
    modify_to: string | null; 
    info: string;
    type_field: ITypeField;
    maxlength: number | null;
}

export interface IModelForm {
    id: number;
    fieldname: string;
    label: string;
    size: number;
    required: boolean;
    order: number;
    visible: boolean;
    editable: boolean;
    filterField: string; // valor para filtrar el campo que tiene modify_to
    modifyTo: string | null; // Puede ser null si no se modifica a otro tipo
    info: string;
    component: string; // Nombre del tipo de campo
    maxlength: number | null;
}

export interface IModelField {
    editable: boolean;
    required: boolean;
    label: string;
    name: string;
    filterField: string;
    info: string;
    modifyTo?: string | null;
}