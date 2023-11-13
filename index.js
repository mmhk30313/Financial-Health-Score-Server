const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const { authenticateJWT } = require("./api/controllers/auth/index.js");
require("./configs/env.config.js");
require("./configs/db.config.js");
const swaggerUi = require('swagger-ui-express');
const cookieParser = require("cookie-parser");
const router = express.Router();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: true }));
// API PATH
app.use("/.netlify/functions/index", router);
app.use('/api/static', express.static('uploads'));

// middleware that is specific to this router
const appDocument = require('./swagger/docs.json');
const swaggerDocument = require('./swagger/swagger.json');
// app.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(appDocument));

app.use(async (req, res, next) => {
    console.log("\x1b[31m%s\x1b[0m", "Request URL", req?.url);
    if (req?.url == "/api/v1/api-docs/swagger.json" ||
        req?.url === "/" || req?.url === "/api-docs" ||
        req?.url == "/api/v1/user/login" || req?.url == "/api/v1/user/signup"
    ) {
        next();
    } else {
        // next();
        await authenticateJWT(req, res, next);
        if (req?.auth) {
            next();
        } else {
            const err = new Error("User is unauthorized!!!");
            err.status = 401;
            return next(err);
        }
    }

});
// console.log({paths});

// auth middleware
require("./paths/route_path.js")(app);

// route_paths?.map(route_path => app.use('/api', route_path));

// MongoDB Connection With Mongoose
global.appRoot = path.resolve(__dirname);


app.listen(process.env.PORT || 8000, () => {
    console.log("\x1b[32m%s\x1b[0m", "Node server started at", process.env.NODE_ENV === "production" ? process.env.PROD_URL : `http://localhost:${process.env.PORT || 8000}`);
    console.log("\x1b[31m%s\x1b[0m", "Node server started at", process.env.NODE_ENV === "production" ? process.env.PROD_URL + "/api-docs" : `http://localhost:${process.env.PORT || 8000}/api-docs`);
    console.log("\x1b[30m%s\x1b[0m", "Node server started at", process.env.NODE_ENV === "production" ? process.env.PROD_URL + "/api/v1/api-docs/swagger.json" : `http://localhost:${process.env.PORT || 8000}/api/v1/api-docs/swagger.json`);
});

module.exports.handler = serverless(app);
