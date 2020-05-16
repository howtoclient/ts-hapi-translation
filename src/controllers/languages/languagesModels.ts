import * as Joi from 'typesafe-joi';

// define models for hapi swagger validation
/*export const languagesResponseSchema = Joi.object()
        .pattern(Joi.string().length(2),Joi.string())
        .required()
        .label('languagesMap');*/

export const languagesResponseSchema = Joi.array().items(
    Joi.object({
        language: Joi.string().required(),
        label: Joi.string().required()
    }).label('language')
).label('languagesList');

export const languagesParamsSchema = Joi.object().keys({
    system: Joi.allow('dashboard').allow('website').required(),
});

// convert models to interfaces for in-app use
export type languagesResponse = Joi.Literal<typeof languagesResponseSchema>
export type languagesParams = Joi.Literal<typeof languagesParamsSchema>

