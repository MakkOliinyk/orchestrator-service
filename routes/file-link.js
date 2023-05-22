const fileLinkRoutes = async (fastify) => {
    fastify.post('/links', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.get('/links/:linkId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });
};

export default fileLinkRoutes;
