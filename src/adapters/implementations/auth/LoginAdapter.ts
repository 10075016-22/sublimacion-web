import type { IModelUser, IModelUserResponse } from "@/adapters/interfaces/IUser";

export class LoginAdapter {


  static toModel(data: IModelUserResponse): IModelUser {
    return {
      id: data.id,
      name: data.fullname,
      user: data.name,
      email: data.email,
      roles: data.roles,
      token: data.access_token,
      status: data.status === 1
    };
  }
}