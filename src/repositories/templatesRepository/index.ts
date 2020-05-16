import { TemplatesModel, templatesProps} from "../../models/templates";
import { getTranslationsLean } from "../translationsRepository";
import {TemplateLean} from "./interfaces";
export * from "../../models/templates";
export * from "./interfaces";


export const getTemplateByName = async (system: string, name: string): Promise<templatesProps | null> =>
    TemplatesModel.findOne({system, name})

export const getTranslatedTemplate = async (system: string, language: string, name: string): Promise<TemplateLean | null> => {
    const template = await getTemplateByName(system, name);
    if (template === null) {
        return null;
    }
    const templateTranslations = await getTranslationsLean(system, language, template.translationKeys || []);

    if (!Object.keys(templateTranslations).length) {
        return {
            subject: template.subject,
            content: template.template,
        }
    }

    const replaceTranslations = Object.keys(templateTranslations).reduce(
        (res, key): object => Object.assign(res, {[`{${key}}`]: templateTranslations[key]}), {}
    );
    const replaceRegex = new RegExp(Object.keys(replaceTranslations).join('|'), "gi");

    return {
        subject: template.subject.replace(replaceRegex, (matched: string) => replaceTranslations[matched]),
        content: template.template.replace(replaceRegex, (matched: string) => replaceTranslations[matched]),
    }
};