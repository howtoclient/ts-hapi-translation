import {
    createSchema,
    ExtractDoc,
    typedModel,
    ExtractProps,
    Type,
} from 'ts-mongoose';

const templatesSchema = createSchema({
    subject: Type.string({ required: true }),
    system: Type.string({ required: true }),
    name: Type.string({ required: true }),
    template: Type.string({ required: true }),
    translationKeys: Type.array().of(Type.string({ required: true })),
}, { versionKey: false  });

templatesSchema.index( {
    system: 1,
    name: 1,
}, { unique: true });

export const TemplatesModel = typedModel('templates', templatesSchema);
export type templatesDoc = ExtractDoc<typeof templatesSchema>;
export type templatesProps = ExtractProps<typeof templatesSchema>;



