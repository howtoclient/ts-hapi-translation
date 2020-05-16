import {
    createSchema,
    ExtractDoc,
    typedModel,
    ExtractProps,
    Type,
} from 'ts-mongoose';

const languagesSchema = createSchema({
    system: Type.string({ required: true }),
    key: Type.string({ required: true }),
    label: Type.string({ required: true }),
}, { versionKey: false  });

languagesSchema.index( {
    system: 1,
    key: 1,
}, { unique: true });

export const LanguagesModel = typedModel('languages', languagesSchema);
export type languagesDoc = ExtractDoc<typeof languagesSchema>;
export type languagesProps = ExtractProps<typeof languagesSchema>;



