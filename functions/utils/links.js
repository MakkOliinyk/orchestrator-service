const createPath = require("../paths");
const getFullPath = createPath('FILE_LINK');

module.exports = {
    createLink: async (request, reply) => {
        try {
            const response = await makeRequest(getFullPath('/links'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    fileId: request.fileId,
                    ownerId: request.user.id,
                }),
            });
            const data = await response.json();

            return data;
        } catch (error) {
            throw new Error(error);
        }
    },
    getFileId: async (request, reply) => {
        try {
            const response = await makeRequest(getFullPath(`/links/${request.params.linkId}`));
            const data = await response.json();

            return data.fileId;
        } catch (error) {
            throw new Error(error);
        }
    }
};
