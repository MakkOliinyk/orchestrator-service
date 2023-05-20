import { createPath } from "../paths";

const userRoutes = async (fastify) => {
    const getFullPath = createPath('IDENTITY');

    fastify.get('/user/me', async (request, reply) => {

    });

    fastify.post('/user/register', async (request, reply) => {

    });

    fastify.post('/user/login', async (request, reply) => {

    });

    fastify.post('/user/logout', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });
};

export default userRoutes;
