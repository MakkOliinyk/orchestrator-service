const createPath = require("../paths");
const isAuthenticated = require('../middlewares/auth');

const getFullPath = createPath('IDENTITY');

module.exports = (app) => {
    app.get('/user/ping', async (request, reply) => {
        try {
            const response = await makeRequest(getFullPath('/ping'));
            const json = await response.json();

            reply.send(json);
        } catch (error) {
            reply.send(error);
        }
    });

    app.post('/user/register', async (request, reply) => {
        const { body } = request;

        try {
            const response = await makeRequest(
                getFullPath('/register'),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        email: body.email,
                        password: body.password,
                    })
                });
            const data = await response.json();

            reply.header('Authorization', `Bearer ${data.token}`);
            reply.send({ user: data.user, token: data.token });
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    app.post('/user/login', async (request, reply) => {
        const { body, headers } = request;

        try {
            const response = await makeRequest(
                getFullPath('/login'),
                {
                    method: 'POST',
                    headers: {
                        Authorization: headers.authorization,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(body),
                });
            const data = await response.json();

            reply.header('Authorization', `Bearer ${data.token}`);
            reply.send(data.user);
        } catch (error) {
            throw new Error(error);
        }
    });

    app.get('/user/me', isAuthenticated, async (request, reply) => {
        try {
            reply.send(request.user);
        } catch (error) {
            reply.send(error);
        }
    });

    app.post('/user/logout', isAuthenticated, async (request, reply) => {
        const { headers } = request;

        try {
            const response = await makeRequest(
                getFullPath('/logout'),
                {
                    method: 'POST',
                    headers: {
                        authorization: headers.authorization,
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                });
            const data = await response.json();

            reply.removeHeader('authorization');
            reply.send(data);
        } catch (error) {
            throw new Error(error);
        }
    });
};
