const { v4 } = require('uuid');
const axios = require('axios');
const createPath = require("../paths");
const host = require('../paths/host');

const getFullPath = createPath('TRACING');

function extractRouteDetails(url) {
    const x = '/app';

    const [domain, path] = url.split(x);
    return [domain.concat(x), path];
}

const requestHandler = () => {
    let isSendingRequest = false;

    axios.interceptors.request.use((config) => {
        const traceId = config.headers['x-trace-id'] || '';
        config.headers['x-trace-id'] = traceId || v4();
        config.metadata = { startTime: new Date() };

        return config;
    });

    axios.interceptors.response.use(
        (response) => {
            if (!isSendingRequest) {
                isSendingRequest = true;

                const traceId = response.config.headers['x-trace-id'];
                const { method, url } = response.config;
                const { status } = response;

                const [domain, path] = extractRouteDetails(url);

                const startTime = response.config.metadata.startTime;
                const endTime = new Date();
                const timeDiff = endTime - startTime;
                const formattedTime = (timeDiff / 1000).toFixed(3);

                const log = {
                    method,
                    from: host,
                    to: domain,
                    url: path,
                    status,
                    time: startTime.toISOString(),
                    responseTime: formattedTime,
                };

                if (domain === getFullPath('/')) return response;

                axios
                    .post(getFullPath('/logs'), { traceId, log })
                    .then(() => { isSendingRequest = false; })
                    .catch((error) => {
                        isSendingRequest = false;
                        throw error;
                    });
            }

            return response;
        },
        (error) => {
            throw error;
        }
    );

    return axios;
};

module.exports = requestHandler();
