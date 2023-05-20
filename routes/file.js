const fileRoutes = async (fastify) => {
    fastify.post('/file/add', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.delete('/file/delete/:fileId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.get('/file/get/:fileId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.get('/file/getAll/:userId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });
};

export default fileRoutes;
