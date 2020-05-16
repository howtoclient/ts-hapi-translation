import * as Hapi from 'hapi';
import * as Boom from '@hapi/boom';
import {translationsParams, translationsResponse} from "./translationsModels";
import {getTranslationsLean} from "../../repositories/translationsRepository";
import {isLanguageExists} from "../../repositories/langaugesRepository";

export const getTranslationsController = async ({params}: Hapi.Request ): Promise<translationsResponse> => {
    const {language, system}  = params as translationsParams ||  {language: 'en', system: 'dashboard'};

    if (!await isLanguageExists(system, language)) {
        throw Boom.notFound(`Language '${language.toUpperCase()}' is not supported on system ${system}`);
    }

    return getTranslationsLean(system,language.toUpperCase())
};