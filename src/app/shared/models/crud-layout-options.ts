import { IApiResponse } from "./api-response";
import { BaseModel } from "./base-model";

export class CrudLayoutOptions<T> {
    url!: string;
    cols!: CrudLayoutColumns[];
    model?: T;
    showToolBar?: boolean = true;
    showSearch?: boolean = true;
    dialogComponent: any;
    dialogHeader!: string;
    dialogWidth?: string = '60%';
    contentStyle?: any = { "max-height": "500px", "overflow": "auto" };
    /**
     * Silmek için sorulduğunda hangi alana göre soracağını belirtir örn:
     * language.name alanını silmek istediğinize emin misiniz?
     */
    deleteProperty?: string = 'name';
}

export class CrudLayoutColumns {
    /**
     * modeldeki ismi yazılmalı pSortable ve field alanlarında kullanmak için
     * field ismi crudButtons olursa o alanda güncelle-sil butonları görünür.
     */
    field!: string;
    /**
     * Headerda kullanılacak isim
     */
    fieldHeaderName!: string;
    /**
     * Filtreleme headerı tipi örn:none,text,number,autocomplete,trueFalse
     */
    type!: string;
    /**
     * Tipe uygun inputların placeholderı varsa placeholder alanları için
     */
    typePlaceHolder?: string;
    autoCompleteUrl?: string;
    isGlobalFilter?: boolean = false;
}