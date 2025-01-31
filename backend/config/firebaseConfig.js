const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');
const path = require('path');

const serviceAccount = require(path.join(__dirname, './firebase-security-key.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "college-pms.appspot.com", 
});

const bucket = getStorage().bucket();

module.exports = bucket;
