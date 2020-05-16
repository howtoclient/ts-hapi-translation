import {LanguagesModel, languagesProps} from "../../models/languages";

export * from "./interfaces";
import {LanguagesLean, LanguagesMap} from "./interfaces";


export const getLanguages = async (system: string): Promise<LanguagesMap> => {
    const languages: Array<languagesProps> = await LanguagesModel.find({system});
    return languages.reduce(
        (res, language)=>Object.assign(res,{[language.key]: language}), {}
    );
};

export const getLanguagesLean = async (system: string): Promise<LanguagesLean> => {
    const languages: Array<languagesProps> = await LanguagesModel.find({system});
    return languages.map(
        (language) => ({
            language: language.key,
            label: language.label
        })
    );
};

export const isLanguageExists = async (system: string, language: string): Promise<boolean> =>{
    return LanguagesModel.exists({ system, key: language.toUpperCase() })
}