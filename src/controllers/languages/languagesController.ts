import * as Hapi from 'hapi';
import {getLanguagesLean} from "../../repositories/langaugesRepository";
import {languagesParams, languagesResponse} from "./languagesModels";

export const getSupportedLanguages = async ({params}: Hapi.Request ): Promise<languagesResponse> => {
    const {system}  = params as languagesParams ||  { system: 'dashboard'};
    const languages = await getLanguagesLean(system);
    return languages as languagesResponse;
};