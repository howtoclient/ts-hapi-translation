import {ServerRoute} from "hapi";
import {getTranslationsController, translationsParamsSchema, translationsResponseSchema} from '../controllers/translations'


export const translationsRoutes: Array<ServerRoute> = [
    {
        method: "GET",
        path: '/{system}/translations/{language}',
        options: {
            id: 'getTranslations',
            description: 'Get language translations hash-map',
            notes: 'Returns hash-map of translations for selected language ( with auto fill to default language )',
            tags: ['api'],
            handler: getTranslationsController,
            validate:{
                params: translationsParamsSchema as any,
            },
            response:{
                schema: translationsResponseSchema as any
            }
        }
    },
];