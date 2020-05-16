import * as Hapi from 'hapi';
import * as Boom from '@hapi/boom';

import {isLanguageExists} from "../../repositories/langaugesRepository";
import {templatesParams, templatesResponse} from "./templatesModels";
import {getTranslatedTemplate} from "../../repositories/templatesRepository";

export const getTemplateController = async ({params}: Hapi.Request ): Promise<templatesResponse> => {
    const {language, system, name}  = params as templatesParams ||  {language: 'en', system: 'dashboard', name: 'template'};
    if (!await isLanguageExists(system, language)) {
        throw Boom.notFound(`Language '${language.toUpperCase()}' is not supported on system ${system}`);
    }

    const template = await getTranslatedTemplate(system, language, name);
    if (template === null) {
        throw Boom.notFound(`Template '${name}' is not supported on system ${system}`);
    }
    return {
        subject: template.subject,
        content: template.content
    };
};