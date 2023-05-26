const express = require('express');
const functions = require('firebase-functions');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const identityServiceRoutes = require('./routes/identity');
const fileServiceRoutes = require('./routes/file');
const fileLinkServiceRoutes = require('./routes/file-link');

const app = express();
app.use(cors({ credentials: true, exposedHeaders: ['Content-Disposition'] }));

identityServiceRoutes(app);
fileLinkServiceRoutes(app);
fileServiceRoutes(app);

exports.app = functions.https.onRequest(app);
