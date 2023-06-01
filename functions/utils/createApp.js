const axios = require("axios");
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const createPath = require("../paths");
const host = require('../paths/host');

const getFullPath = createPath('TRACING');

module.exports = () => {
    const app = express();
    app.use(cors({ credentials: true, exposedHeaders: ['Content-Disposition'] }));

    app.use((req, res, next) => {
        req.traceId = uuidv4();
        next();
    });

    app.use((req, res, next) => {
        const logRequest = morgan((tokens, req, res) => {
            return JSON.stringify({
                method: tokens.method(req, res),
                url: tokens.url(req, res),
                from: 'http_client',
                to: host,
                status: tokens.status(req, res),
                time: tokens.date(req, res, 'iso'),
                responseTime: tokens['response-time'](req, res),
            });
        }, {
            stream: {
                write: (message) => {
                    axios.post(getFullPath('/logs'), { traceId: req.traceId, log: JSON.parse(message) }).catch((error) => {
                        console.error('Failed to send log:', error);
                    });
                },
            },
        });

        logRequest(req, res, next);
    });

    return app;
};
