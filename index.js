import fastify from 'fastify';

import fileServiceRoutes from './routes/file';
import fileLinkServiceRoutes from './routes/file-link';
import packagingServiceRoutes from './routes/packaging';
import userServiceRoutes from './routes/user';

const app = fastify({ logger: true });

app.register(userServiceRoutes);
app.register(fileServiceRoutes);
app.register(fileLinkServiceRoutes);
app.register(packagingServiceRoutes);

const start = async () => {
    try {
        await app.listen(process.env.PORT || 5000, '0.0.0.0');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
