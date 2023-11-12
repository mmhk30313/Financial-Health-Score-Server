import { Application } from "express";
import appDocument from './docs.json';
import swaggerUi from 'swagger-ui-express';


import { error4o4Controller, error500Controller, error401Controller } from '../src/app/error_handles/error_handle_controllers';
// Application routes
import userRoutes from "./app/modules/user/user.route";
export const configRoutes = (app: Application) => {
    // all_paths.map(path => app.use('/api', path));
    console.log({ hello: "World" });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(appDocument));
    app.use('/', swaggerUi.serve, swaggerUi.setup(appDocument));
    app.use("/api/v1/user", userRoutes);
    app.use(error4o4Controller);
    app.use(error500Controller);
    app.use(error401Controller);
}