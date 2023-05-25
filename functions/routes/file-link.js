const axios = require("axios");

const createPath = require("../paths");
const isAuthenticated = require('../middlewares/auth');

const getFullPath = createPath('FILE_LINK');

module.exports = (app) => {
    app.get('/links/:linkId', isAuthenticated, async (request, reply) => {
        const { linkId } = request.params;

        try {
            const response = await axios.get(getFullPath(`/links/${linkId}`));

            console.log(`Success: File id retrieved successfully`);
            reply.status(200).send({ message: 'File id retrieved successfully', id: response.data.fileId });
        } catch (error) {
            console.error('Error: Failed to retrieve file id', error);
            reply.status(500).send({ error: 'Error: Failed to retrieve file id' });
        }
    });
};
