import { IApiResponse } from "../shared/models/api-response";
import { BaseModel } from "../shared/models/base-model";

export interface IGeneralSettings extends BaseModel, IApiResponse<IGeneralSettings> {
}


export class GeneralSettings implements BaseModel {
    id!: string;
    smtpHost!: string;
    smtpPort!: string;
    email!: string;
    password!: string;
    displayName!: string;
    supportMail!: string;
    contactAddress!: string;
    contactPhone!: string;
    contactWhatsApp!: string;
    googleMapUrl!: string;
    testimonailSlideId!: string;
    testimonailSlide!: any;
    generalSettingsTrans!: GeneralSettingsTrans[];
}

export class GeneralSettingsTrans implements BaseModel {
    id!: string;
    generalSettingsId!: string;
    languageId!: string;
    logoPath!: string;
    icoPath!: string
    aboutUs!: string
    homeOgTitle!: string
    homeOgDescription!: string
    contactOgTitle!: string
    contactOgDescription!: string
    contactOgImage!: string
}