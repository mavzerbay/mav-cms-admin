import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface ICustomVar extends BaseModel, IApiResponse<ICustomVar> {
}

export class CustomVar implements BaseModel {
    id!: string;
    groupName!: string;
    keyName!: string;
    value!: string;
    customVarTrans!: CustomVarTrans[];
}

export class CustomVarTrans implements BaseModel {
    id!: string;
    customVarId!: string;
    languageId!: string;
    name!: string;
    description!: string
}