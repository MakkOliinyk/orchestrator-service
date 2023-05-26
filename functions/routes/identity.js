const axios = require("axios");

const createPath = require("../paths");
const isAuthenticated = require('../middlewares/auth');

const getFullPath = createPath('IDENTITY');

module.exports = (app) => {
    app.post('/user/register', async (request, reply) => {
        const { body } = request;

        try {
            const { data } = await axios({
                method: 'post',
                url: getFullPath('/register'),
                data: {
                    email: body.email,
                    password: body.password,
                }
            });

            reply.header('Authorization', `Bearer ${data.token}`);
            reply.send(data.user);
        } catch (error) {
            reply.status(400).send(error);
        }
    });

    app.post('/user/login', async (request, reply) => {
        const { body, headers } = request;

        try {
            const { data } = await axios({
                method: 'post',
                url: getFullPath('/login'),
                headers: {
                    Authorization: headers.authorization,
                },
                data: body,
            });

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
            const response = await axios({
                method: 'post',
                url: getFullPath('/logout'),
                headers: {
                    authorization: headers.authorization,
                },
                data: {},
            });

            reply.removeHeader('authorization');
            reply.send(response.data);
        } catch (error) {
            throw new Error(error);
        }
    });
};
