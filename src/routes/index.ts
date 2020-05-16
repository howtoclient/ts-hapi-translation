import {ServerRoute} from "hapi";
import { translationsRoutes } from "./translations";
import { templatesRoutes } from "./templates";
import { importsRoutes } from "./imports";
import { languagesRoutes } from "./languages";

export const routes: Array<ServerRoute> = [
    ...translationsRoutes,
    ...templatesRoutes,
    ...importsRoutes,
    ...languagesRoutes
];