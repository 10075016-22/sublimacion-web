interface IModelPermission {
    id: number;
    name: string;
    guard_name: string;
    alias: string;    
}
interface IModelRole {
    id: number;
    name: string;
    guard_name: string;
    permissions: Array<IModelPermission>
}

export interface IModelUserResponse {
    id: number;
    name: string;
    email: string;
    fullname: string;
    access_token: string;
    roles: Array<IModelRole>;
    status: number;
}

export interface IModelUser {
    id: number;
    user: string;
    email: string;
    name: string;
    token: string;
    roles: Array<IModelRole>;
    status: boolean;
}