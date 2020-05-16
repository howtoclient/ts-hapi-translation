import {importsParams, importsPayload, importsResponse} from "./importsModels";
import * as Hapi from "hapi";
import * as Boom from "@hapi/boom";
import * as csv from 'csvtojson';
import {importFromArray, ImportsMap} from "../../repositories/importsRepository";


export const postImportFileController = async ({params, payload}: Hapi.Request ): Promise<importsResponse> =>{
    const {system}  = params as importsParams ||  {system: 'dashboard'};
    const {file} = payload as importsPayload || {file: null};
    if (!file) {
        throw Boom.badRequest("No file was uploaded")
    }
    try {
        const csvJson: Array<ImportsMap> =await csv().fromFile(file.path);
        return importFromArray(csvJson, system)
    } catch (e) {
        console.error(e);
        throw Boom.badRequest("Provided file is broken or corrupted. Please provide CSV file")
    }
};