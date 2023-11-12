const swaggerUi = require('swagger-ui-express');
const express = require("express");
const appDocument = require('../../docs.json');
const swaggerDocument = require('../../swagger.json');
const app = express();
// app.get("/api/v1/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(appDocument));
// app.use('/', swaggerUi.serve, swaggerUi.setup(appDocument));
const router = express.Router();
// Just simple info for root api endpoint
// router.get("/", (req, res) => {
//     res.sendFile
// });

// router.get("/api-docs", swaggerUi.serve, swaggerUi.setup(appDocument));

// router.get("/api/v1/api-docs/swagger.json", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;