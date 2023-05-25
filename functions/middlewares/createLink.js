const axios = require("axios");

const createPath = require("../paths");

const getFullPath = createPath('FILE_LINK');

module.exports = async (request, reply) => {
    try {
        const response = await axios.post(getFullPath('/links'), {
            fileId: request.fileId,
            ownerId: request.user.id,
        });

        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
