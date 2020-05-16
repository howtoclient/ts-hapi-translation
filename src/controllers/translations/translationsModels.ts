import * as Joi from 'typesafe-joi';

// define models for hapi swagger validation
export const translationsResponseSchema = Joi.object()
    .pattern(Joi.string(),Joi.string())
    .required()
    .label('translationsMap');

export const translationsParamsSchema = Joi.object().keys({
    language: Joi.string().min(2).max(5).required(),
    system: Joi.allow('dashboard').allow('website').required(),
});

// convert models to interfaces for in-app use
export type translationsResponse = Joi.Literal<typeof translationsResponseSchema>
export type translationsParams = Joi.Literal<typeof translationsParamsSchema>

