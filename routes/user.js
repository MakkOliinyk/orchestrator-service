import axios from 'axios';

import { createPath } from "../paths";

const userRoutes = async (fastify) => {
    const getFullPath = createPath('IDENTITY');

    fastify.get('/user/me', async (request, reply) => {
        const { query, headers, body } = request;

        try {
            const response = await axios.get(getFullPath('/me'), {
                params: query,
                headers: headers,
                data: body
            });

            reply.send(response.data);
        } catch (error) {
            reply.code(500).send('Error occurred while making the request.');
        }
    });

    fastify.post('/user/register', async (request, reply) => {

    });

    fastify.post('/user/login', async (request, reply) => {

    });

    fastify.post('/user/logout', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });
};

export default userRoutes;
