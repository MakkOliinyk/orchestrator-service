const express = require("express");
const cors = require("cors");
const { v4 } = require("uuid");

const tracerMiddleware = require("../middlewares/tracer");

module.exports = () => {
    const app = express();
    app.use(cors({ credentials: true, exposedHeaders: ['Content-Disposition'] }));

    app.use((req, res, next) => {
        req.traceId = v4();
        next();
    });

    app.use(tracerMiddleware);

    return app;
};
