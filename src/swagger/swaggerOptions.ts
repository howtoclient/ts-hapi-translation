import * as HapiSwagger from 'hapi-swagger';
import {version} from '../../package.json'

export const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
        title: 'Translation API Documentation',
        version: version,
    },
    tags: [
        {
            name: 'api',
            description: 'This is the basic api'
        }
    ],
    reuseDefinitions: false,
    grouping: 'tags',
    tagsGroupingFilter: (tag)=> !!tag,
    documentationPath: '/swagger'
};