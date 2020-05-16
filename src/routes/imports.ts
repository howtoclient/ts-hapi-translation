import {ServerRoute} from "hapi";
import {postImportFileController, importsPayloadSchema, importsResponseSchema, importsParamsSchema} from '../controllers/imports'


export const importsRoutes: Array<ServerRoute> = [
    {
        method: "POST",
        path: '/{system}/import',
        options: {
            id: 'postImportCSVFile',
            tags: ['api'],
            description: 'Import translations from CSV',
            notes: 'Imports translations form CSV file',
            handler: postImportFileController,
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: importsParamsSchema as any,
                payload: importsPayloadSchema as any,
            },
            payload: {
                maxBytes: 1048576 * 8,
                parse: true,
                multipart: {
                    output: "file"
                },
            },
            response:{
                schema: importsResponseSchema as any
            },
        }
    },
];