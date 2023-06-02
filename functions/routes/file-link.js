const createPath = require("../paths");
const isAuthenticated = require('../middlewares/auth');
const { createLink, getFileId } = require("../utils/links");

const getFullPath = createPath('FILE');

module.exports = (app) => {
    app.post('/links', isAuthenticated, async (request, reply) => {
        try {
            request.fileId = request.body.fileId;

            const link = await createLink(request, reply);

            reply.send(link);
        } catch (error) {
            reply.send(error);
        }
    });

    app.get('/links/:linkId', async (request, reply) => {
        try {
            const fileId = await getFileId(request, reply);

            const filesResponse = await makeRequest(getFullPath(`/documents/${fileId}/info`));
            const data = await filesResponse.json();

            reply.status(200).send({ fileId, fileName: data.fileName });
        } catch (error) {
            reply.send(error);
        }
    });
};
