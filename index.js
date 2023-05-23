import fastify from 'fastify';

import fileServiceRoutes from './routes/file';
import fileLinkServiceRoutes from './routes/file-link';
import packagingServiceRoutes from './routes/packaging';
import userServiceRoutes from './routes/user';

let requestHandler = null;

const app = fastify({
    logger: true,
    serverFactory: (handler) => {
        requestHandler = handler;
        return require('http').createServer();
    },
});

app.addContentTypeParser('application/json', {}, (req, body, done) => {
    done(null, body.body);
});

app.register(userServiceRoutes);
app.register(fileServiceRoutes);
app.register(fileLinkServiceRoutes);
app.register(packagingServiceRoutes);

exports.app = functions.https.onRequest((req, res) => {
    app.ready((err) => {
        if (err) throw err;
        requestHandler(req, res);
    });
});
