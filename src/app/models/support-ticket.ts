import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface ISupportTicket extends BaseModel, IApiResponse<ISupportTicket> {
}

export class SupportTicket implements BaseModel {
    id!: string;
    email!: string;
    phoneNumber!: string;
    name!: string;
    surname!: string;
    nameSurname!: string;
    content!: string;
    isClosed!: boolean;
    supportType!: any;
    supportTypeId!: any;
}