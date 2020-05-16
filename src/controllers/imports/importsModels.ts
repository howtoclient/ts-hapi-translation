import * as Joi from 'typesafe-joi';

// define models for hapi swagger validation
export const importsParamsSchema = Joi.object().keys({
    system: Joi.allow('dashboard').allow('website').required(),
});

export const importsPayloadSchema = Joi.object({
    file: Joi.object({
        path: Joi.string().required(),
        filename: Joi.string().required(),
        headers: Joi.object({
            'content-disposition' : Joi.string().required(),
            'content-type' : Joi.string().valid('text/csv').valid('application/octet-stream').required(),
        }).unknown().required()
    }).unknown().meta({ swaggerType: 'file' })
        .description('csv file')
});

export const importsResponseSchema = Joi.object().keys({
    inserted: Joi.number().required(),
    updated: Joi.number().required(),
    errors: Joi.number().required(),
}).label("importResults");


// convert models to interfaces for in-app use
export type importsResponse = Joi.Literal<typeof importsResponseSchema>
export type importsParams = Joi.Literal<typeof importsParamsSchema>
export type importsPayload = Joi.Literal<typeof importsPayloadSchema>

