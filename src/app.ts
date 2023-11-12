import express, { Application } from "express";
import dotenv from 'dotenv';
import cors from "cors";
// import swaggerUi from 'swagger-ui-express';

const app: Application = express();

dotenv.config();
// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// import appDocument from './docs.json';
import authenticateJWT from "./app/auth";
import { configRoutes } from "./routes";
// import swaggerDocument from './swagger.json';
// app.get("/api/v1/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(appDocument));
// app.use('/', swaggerUi.serve, swaggerUi.setup(appDocument));

// middleware that is specific to this router
app.use(async (req: any, res: any, next: any) => {
    console.log("\x1b[31m%s\x1b[0m", "Request URL", req?.url);
    if (req?.url?.includes("/api/v1/verify-email?email=") || req?.url == "/api/v1/user/login" || req?.url == "/api/v1/user/signup" ||
        req?.url?.includes("/api/user/reset-password") || req?.url === "/api/user/change-password" ||
        req?.url?.includes("'/api-docs'") || req?.url?.includes("/")
    ) {
        console.log("\x1b[32m%s\x1b[0m", "Request URL", req?.url);

        next();
    } else {
        await authenticateJWT(req, res, next);
        if (req?.auth) {
            next();
        } else {
            const err: any = new Error("User is unauthorized!!!");
            err.status = 401;
            return next(err);
        }
    }
});

// auth middleware
configRoutes(app);

const port: number = 5000;
app.listen(port, () => {

    // yellow color code
    console.log('\x1b[33m', `Server is listening on port ${port}`);
    console.log('\x1b[35m', `Api Document: http://localhost:${port}`);
    console.log('\x1b[30m', `Api Document: http://localhost:${port}/api-docs`);
});

export default app;
