const express = require("express");
// var fs = require('fs');
// const root = require("../../api/views/root/index.html");
const router = express.Router();
// Just simple info for root api endpoint
router.get("/", (_, res) => {
    res.json({
        message: "Welcome to the Financial Health Score API",
        server: process.env.NODE_ENV === "development"
            ? "http://localhost:8000/api-docs"
            : process.env.PROD_URL,
        version: "1.0.0",
    });
});

module.exports = router;