import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface ITranslate extends BaseModel, IApiResponse<ITranslate> {
}

export class Translate implements BaseModel {
    id!: string;
    languageId!: string;
    language!: any;
    keyName!: string;
    translation!: string;
    explanation!: string;
}