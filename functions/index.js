const express = require('express');
const functions = require('firebase-functions');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const identityServiceRoutes = require('./routes/identity');
const fileServiceRoutes = require('./routes/file');
const fileLinkServiceRoutes = require('./routes/file-link');

const app = express();

identityServiceRoutes(app);
fileLinkServiceRoutes(app);
fileServiceRoutes(app);

exports.app = functions.https.onRequest(app);
