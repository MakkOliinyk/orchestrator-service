const axios = require("axios");

const createPath = require("../paths");

const getFullPath = createPath('FILE_LINK');

module.exports = {
    createLink: async (request, reply) => {
        try {
            const response = await axios.post(getFullPath('/links'), {
                fileId: request.fileId,
                ownerId: request.user.id,
            });

            return response.data;
        } catch (error) {
            throw new Error(error);
        }
    },
    getFileId: async (request, reply) => {
        try {
            const response = await axios.get(getFullPath(`/links/${request.params.linkId}`));

            return response.data.fileId;
        } catch (error) {
            throw new Error(error);
        }
    }
};
