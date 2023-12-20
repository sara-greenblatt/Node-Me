require('dotenv').config(); // Load environment variables from .env file
const { serverSwagger, serverAuthorization } = require('./serverUtils');
const Routes = require('./controllers/index');
const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

const port = process.env.PORT; // Read port from environment variable

// Middleware to parse JSON request bodies
app.use(express.json());

// swagger integration
serverSwagger(app);

// JWT authorization middleware
app.use(/^(?!.*\/anonymous).*/, serverAuthorization.authenticate);

// Register routes-> User Router
new Routes(app);

const keyPath = process.env.SSL_KEY_PATH;
const certPath = process.env.SSL_CERT_PATH;

https
    .createServer(
        {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        },
        app
    )
    .listen(port, () => {
        console.log("HTTPS server is running at port", port);
    });

module.exports = app;
