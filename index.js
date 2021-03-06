/*
    Node.js express https with ssl certification generated by openssl for localhost
    register rootCA.pem to system's Trusted Root Certification Authorities
*/

const express = require('express');
const fs = require('fs');
const https = require('https')

const app = express();

// constants
const HTTP_PORT = 80;
const HTTPS_PORT = 443;
const HTTPS_KEY_FILE_PATH = 'ssl/server.key';
const HTTPS_CERT_FILE_PATH = 'ssl/server.crt';

// define express routes
app.get('/', (req, res) => {
    res.send(`Hello world from express.js<br/> Protocal: ${req.protocol}`);
});

// http server
app.listen(HTTP_PORT, () => {
    console.log(`http started on port: ${HTTP_PORT}`);
});

// https server
try {
    const https_options = {
        key: fs.readFileSync(HTTPS_KEY_FILE_PATH),
        cert: fs.readFileSync(HTTPS_CERT_FILE_PATH),
    };

    https.createServer(https_options, app)
        .listen(HTTPS_PORT, () => {
            console.log(`https started on port: ${HTTPS_PORT}`);
        });
} catch (err) {
    console.log('can not start https server');
    console.log(err);
}
