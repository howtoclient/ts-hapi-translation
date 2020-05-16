import {translationsProps} from "../../models/translations";
export * from '../../models/translations';

export interface TranslationsMap {
    [indexer: string]: translationsProps;
}
export interface TranslationsLeanMap {
    [indexer: string]: string;
}