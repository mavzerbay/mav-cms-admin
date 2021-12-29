import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface IAppUser extends BaseModel, IApiResponse<IAppUser> {
}

export class AppUser implements BaseModel {
    id!: string;
    name!: string;
    surname!: string;
    nameSurname!: string;
    phoneNumber!: string;
    profileImagePath!: string;
    userName!: string;
    userRoles!: any[];
}