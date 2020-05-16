import * as Joi from 'typesafe-joi';

// define models for hapi swagger validation
export const templatesResponseSchema = Joi.object().keys({
    subject: Joi.string().required(),
    content: Joi.string().required(),
}).label('templateResponse');

export const templatesParamsSchema = Joi.object().keys({
    name: Joi.string().required(),
    language: Joi.string().min(2).max(5).required(),
    system: Joi.allow('dashboard').allow('website').required(),
});

// convert models to interfaces for in-app use
export type templatesResponse = Joi.Literal<typeof templatesResponseSchema>
export type templatesParams = Joi.Literal<typeof templatesParamsSchema>

