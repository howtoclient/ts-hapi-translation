export * from './interfaces';
import {TranslationsMap, TranslationsLeanMap, TranslationsModel, translationsProps} from "./interfaces";

const DEFAULT_LANGUAGE=process.env.DEFAULT_LANGUAGE;

export const getDefaultTranslations = async (system: string, keys?: Array<string>): Promise<TranslationsMap> => {
    const query = {system, language: DEFAULT_LANGUAGE};
    if (Array.isArray(keys)) {
        Object.assign(query, {key: {$in: keys}})
    }
    const defaults: Array<translationsProps> = await TranslationsModel.find(query);
    return defaults.reduce(
        (res, translation)=>(Object.assign(res,{ [translation.key] : translation})), {}
    );
};

export const getLanguageTranslations = async (system: string, language: string, keys?: Array<string>): Promise<TranslationsMap> => {
    const query = {system, language };
    if (Array.isArray(keys)) {
        Object.assign(query, {key: {$in: keys}})
    }
    const translations: Array<translationsProps> = await TranslationsModel.find(query);
    return translations.reduce(
        (res, translation)=>(Object.assign(res,{[translation.key] : translation})), {}
    );
};

export const getTranslations = async (system: string, language: string, keys?: Array<string>): Promise<TranslationsMap> => {
    if (language === DEFAULT_LANGUAGE) {
        return getDefaultTranslations(system, keys);
    }
    const [
        defaults,
        translations
    ]: Array<TranslationsMap> = await Promise.all<TranslationsMap>([
        getDefaultTranslations(system, keys),
        getLanguageTranslations(system, language, keys)
    ]);
    return {
        ...defaults,
        ...translations
    };
};

export const getTranslationsLean = async (system: string, language: string, keys?: Array<string>): Promise<TranslationsLeanMap> => {
    const translations: TranslationsMap = await getTranslations(system, language, keys);
    return Object.keys(translations).reduce(
        (res, key)=> Object.assign(res,{[translations[key].key]: translations[key].content}), {}
    )
};