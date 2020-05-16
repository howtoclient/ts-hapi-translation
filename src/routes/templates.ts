import {ServerRoute} from "hapi";
import {getTemplateController, templatesParamsSchema, templatesResponseSchema} from '../controllers/templates'


export const templatesRoutes: Array<ServerRoute> = [
    {
        method: "GET",
        path: '/{system}/templates/{language}/{name}',
        options: {
            id: 'getTemplateByNane',
            tags: ['api'],
            description: 'Get translated template by name',
            notes: 'Returns translated email template',
            handler: getTemplateController,
            validate:{
                params: templatesParamsSchema as any,
            },
            response:{
                schema: templatesResponseSchema as any
            }
        }
    },
];