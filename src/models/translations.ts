import {
    createSchema,
    ExtractDoc,
    typedModel,
    ExtractProps,
    Type,
} from 'ts-mongoose';

const translationsSchema = createSchema({
    _id: Type.objectId(),
    system: Type.string({ required: true }),
    language: Type.string({ required: true }),
    key: Type.string({ required: true }),
    content: Type.string({ required: true }),
}, { versionKey: false, _id: false, });

translationsSchema.index( {
    system: 1,
    language: 1,
    key: 1,
}, { unique: true });

export const TranslationsModel = typedModel('translations', translationsSchema);
export type translationsDoc = ExtractDoc<typeof translationsSchema>;
export type translationsProps = ExtractProps<typeof translationsSchema>;



