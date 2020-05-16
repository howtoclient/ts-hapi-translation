require('dotenv').config();
import * as Hapi from '@hapi/hapi';
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as HapiSwagger from "hapi-swagger";
import * as mongoose from 'mongoose';
import {swaggerOptions} from './swagger/swaggerOptions';
import {routes} from "./routes";

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3002;


(async (): Promise<void> => {
    if (!process.env.MONGO_CONNECTION_STRING) {
        throw new Error('Missing MONGO_CONNECTION_STRING')
    }
    await mongoose.connect( process.env.MONGO_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    // create server
    const server: Hapi.Server = new Hapi.Server( { host, port, debug: { request: ['error'] }  } );
    // add swagger UI plugin
    await server.register([Inert, Vision, {plugin: HapiSwagger, options: swaggerOptions}]);
    // register routes
    server.route(routes);
    // add basic logger
    server.events.on('response',  ({
                                       info, method, path, response }: Hapi.Request) => {
        console.info(`[${info.remoteAddress}] ${method.toUpperCase()}: ${path} --> ${response.statusCode}`);
    });
    // start server
    await server.start();
    console.info('Server running at:', server.info.uri);
})();

