const fileUploadMiddleware = require('busboy-firebase');

const createPath = require("../paths");
const createFormData = require("../utils/createFormData");
const { createLink } = require("../utils/links");
const isAuthenticated = require('../middlewares/auth');

const getFullPath = createPath('FILE');

module.exports = (app) => {
    app.post('/files', [isAuthenticated, fileUploadMiddleware], async (request, reply) => {
        try {
            const form = createFormData(
                request.files[0].buffer,
                request.files[0].originalname,
                { ownerId: request.user.id, fileName: request.files[0].originalname }
            );

            const response = await makeRequest(getFullPath('/documents'), {
                method: 'POST',
                body: form,
            });

            const data = await response.json();
            request.fileId = data.fileId;

            const link = await createLink(request, reply);

            console.log(`Success: File uploaded successfully: ${request.files[0].originalname}`);
            reply.status(200).send({ message: 'File uploaded successfully', link: link.fileLink });
        } catch (error) {
            console.error('Error: Failed to upload file', error);
            reply.status(500).send({ error: 'Error: Failed to upload file' });
        }
    });

    app.delete('/files/:fileId', isAuthenticated, async (request, reply) => {
        const { fileId } = request.params;

        try {
            await makeRequest(getFullPath(`/documents/${fileId}`), {
                method: 'DELETE'
            });

            console.log(`Success: File deleted successfully`);
            reply.status(200).send({ message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error: Failed to delete file', error);
            reply.status(500).send(error);
        }
    });

    app.get('/files/:fileId', async (request, reply) => {
        const { fileId } = request.params;

        try {
            const response = await makeRequest(getFullPath(`/documents/${fileId}`));

            const buffer = await response.arrayBuffer();
            const fileName = response.headers.get('content-disposition')?.split('filename=')[1];

            reply.header('Content-Disposition', `attachment; filename=${fileName}`);
            reply.type('application/octet-stream');
            reply.send(Buffer.from(buffer));
        } catch (error) {
            console.error('Error: Failed to download file', error);
            reply.status(500).send({ error: 'Error: Failed to download file' });
        }
    });

    app.get('/files', isAuthenticated, async (request, reply) => {
        try {
            const response = await makeRequest(getFullPath(`/documents?ownerId=${request.user.id}`));
            const data = await response.json();

            reply.send({ files: data.files });
        } catch (error) {
            console.error('Error: Failed to retrieve files', error);
            reply.status(500).send({ error: 'Error: Failed to retrieve files' });
        }
    });
};
