import {languagesProps} from "../../models/languages";


export interface LanguagesMap {
    [indexer: string]: languagesProps;
}
export interface LanguagesLean {
    [indexer: number]: {
        language: string;
        label: string;
    };
}