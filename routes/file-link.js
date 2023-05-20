const fileLinkRoutes = async (fastify) => {
    fastify.get('/file-link/link', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });

    fastify.get('/file-link/fileId/:linkId', { preHandler: fastify.routes['user/me'] }, async (request, reply) => {

    });
};

export default fileLinkRoutes;
