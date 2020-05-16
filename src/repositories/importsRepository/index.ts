import {ImportResults, ImportsMap} from "./interfaces";
import {TranslationsModel, translationsProps} from "../../models/translations";
export * from "./interfaces";

export const bulkUpdateTranslations = async (translations: Array<translationsProps>): Promise<ImportResults> =>{
    const bulk = TranslationsModel.collection.initializeOrderedBulkOp();
    translations.forEach(
        translation => {
            bulk.find({
                system: translation.system,
                language: translation.language,
                key: translation.key
            }).upsert().updateOne(translation)
        }
    );

    const {result: {nModified, writeErrors, nUpserted}}: any = await bulk.execute();
    return {
        inserted: nUpserted,
        updated: nModified,
        errors: writeErrors.length
    };
};

export const importFromArray = async (jsonImport: Array<ImportsMap>, system: string): Promise<ImportResults> =>{
    const translations  = jsonImport.reduce(
        (res: Array<translationsProps>, translation: ImportsMap ): Array<translationsProps> => {
            const key = translation.key;
            const languages = Object.keys(translation).filter(
                language=>language!=='key' && translation[language]
            );
            const keyTranslations: Array<translationsProps> = languages.map(
                (language): translationsProps => ({
                    key,
                    system,
                    language: language.toUpperCase(),
                    content: translation[language],
                })
            );

            return res.concat(keyTranslations);
        }, []
    );

   return bulkUpdateTranslations(translations);
};

