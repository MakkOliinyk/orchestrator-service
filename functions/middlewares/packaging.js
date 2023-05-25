const axios = require("axios");

const createPath = require("../paths");
const createFormData = require("../utils/createFormData");

const getFullPath = createPath('PACKAGING');

module.exports = () => {
    return {
        getArchive: async (req, res) => {
            try {
                const form = createFormData(req.files[0].buffer, req.files[0].originalname);

                const archive = await axios.post(
                    getFullPath('/archive'),
                    form,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                return archive.data;
            } catch (error) {
                console.error('Error: Failed to archive file', error);
                throw new Error(error);
            }
        },
        getFile: async (req, res) => {
            try {
                const form = createFormData(req.file, req.fileName);

                const file = await axios.post(
                    getFullPath('/unarchive'),
                    form,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                return file.data;
            } catch (error) {
                console.error('Error: Failed to archive file', error);
                throw new Error(error);
            }
        }
    };
};
