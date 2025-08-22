import type { IModelForm, IModelFormResponse } from "@/adapters/interfaces/form/IModelForm";

export class FormAdapter {
    static toModelHeaders(data: IModelFormResponse[]): IModelForm[] {
        return data.map((item: IModelFormResponse) => {
            return {
                id: item.id,
                fieldname: item.field_name,
                label: item.label,
                size: item.size,
                required: item.required === 1, // Convertimos el valor a booleano
                order: item.order,
                visible: item.visible === 1, 
                editable: item.editable === 1,
                filterField: item?.filter_field?.toString() || '',
                modifyTo: item.modify_to,
                info: item.info,
                component: item.type_field.name, // Assuming type_field is an object with a name property
                maxlength: item.maxlength || null,
            };
        });
    }
}