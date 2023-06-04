const morgan = require("morgan");
const {v4} = require("uuid");
const createPath = require("../paths");

const getFullPath = createPath('TRACING');

module.exports = (req, res, next) => {
    const logRequest = morgan((tokens, req, res) => {
        return JSON.stringify({
            method: tokens.method(req, res),
            url: tokens.url(req, res),
            from: 'http_client',
            to: req.hostname,
            status: tokens.status(req, res),
            time: tokens.date(req, res, 'iso'),
            responseTime: tokens['response-time'](req, res),
        });
    }, {
        stream: {
            write: (message) => {
                fetch(
                    getFullPath('/logs'),
                    {
                        headers: {'Content-Type': 'application/json;charset=utf-8'},
                        method: 'POST',
                        body: JSON.stringify({ traceId: v4(), log: JSON.parse(message) })
                    }
                ).catch((error) => {
                    console.error('Failed to send log:', error);
                });
            },
        },
    });

    const start = Date.now();

    global.makeRequest = async function (url, options = {}) {
        const traceId = v4();

        const response = await fetch(url, options).catch(error => console.error('error', error));

        const responseTime = ((Date.now() - start) / 1000).toFixed(3);

        const log = {
            method: options.method || 'GET',
            from: req.hostname,
            to: new URL(url).host,
            url: new URL(url).pathname,
            status: response.status,
            time: new Date(start).toISOString(),
            responseTime: responseTime,
        };

        await fetch(
            getFullPath('/logs'),
            { headers: {'Content-Type': 'application/json;charset=utf-8'}, method: 'POST', body: JSON.stringify({ traceId, log }) }
        );

        return response;
    };

    logRequest(req, res, next);
};
