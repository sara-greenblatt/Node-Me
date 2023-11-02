const swaggerAutogen = require('swagger-autogen')();
const doc = require('./swagger-doc.json');

const outputFile = './auto-swagger-output.json'; // Define the output file for the Swagger JSON.

const endpointsFiles = ['../../server.js', '../../controllers/index.js']; // API endpoints.

// Script to generate Swagger documentation
// Use in dev status only
swaggerAutogen(outputFile, endpointsFiles, doc);
