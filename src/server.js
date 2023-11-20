require('dotenv').config(); // Load environment variables from .env file
const { serverSwagger } = require('./serverUtils');
const Routes = require('./controllers/index');
const express = require('express');

const app = express();

const port = process.env.PORT; // Read port from environment variable

// Middleware to parse JSON request bodies
app.use(express.json());

// Register routes-> User Router
new Routes(app);

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Retrieve something
 *     responses:
 *       200:
 *         description: Successfully retrieved something
 */
app.get('/', (req, res) => {
    console.log('request received', req.url);
    res.send('Hello World!'); // Temporary response
});

// swagger integration
serverSwagger(app);

// start the server on port
app.listen(port, () => {
    console.log('Server is listening on port', port);
}).on('error', (error) => {
    console.error(error);
});

module.exports = app;
