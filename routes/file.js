const fileRoutes = async (fastify) => {
    fastify.post('/file', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.delete('/file/:fileId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {
        // Check ownership before deleting
    });

    fastify.get('/file/:fileId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.get('/file', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {
        const { userId } = request.query; // TODO: get from user/me
    });
};

export default fileRoutes;
