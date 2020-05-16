import {ServerRoute} from "hapi";
import {getSupportedLanguages, languagesParamsSchema, languagesResponseSchema} from '../controllers/languages'


export const languagesRoutes: Array<ServerRoute> = [
    {
        method: "GET",
        path: '/{system}/languages',
        options: {
            id: 'getLanguages',
            description: 'Get supported languages',
            notes: 'Returns array of supported languages',
            tags: ['api'],
            handler: getSupportedLanguages,
            validate:{
                params: languagesParamsSchema as any,
            },
            response:{
                schema: languagesResponseSchema as any
            }
        }
    },
];