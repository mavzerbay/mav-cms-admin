import { IApiResponse } from "./api-response";
import { BaseModel } from "./base-model";

export interface ICurrentUser extends BaseModel, IApiResponse<ICurrentUser> {
}

export class CurrentUser implements BaseModel {
    id!: string;
    name!:string;
    surname!:string;
    token!:string;
    userName!:string;
    profilePhotoPath!:string;
}