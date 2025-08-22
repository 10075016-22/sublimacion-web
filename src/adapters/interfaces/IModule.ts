export interface IModelModuleResponse {
    id: number;
    module: string;
    description: string;
    icon: string;
    name: string;
    order: number;
    status: number;
    divider: number;
}

export interface IModelModule {
    id: number;
    name: string;
    description: string;
    icon: string;
    path: string;
    order: number;
    status: boolean;
    divider: boolean;
}