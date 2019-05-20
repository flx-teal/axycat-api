const functions = require('firebase-functions');
process.env.NODE_ENV = 'development';
const app = require('./app');

exports.app = functions
  .region('europe-west1')
  .runWith({ memory: '1GB', timeoutSeconds: 240 })
  .https
  .onRequest(app);
