const swaggerUi = require('swagger-ui-express');
const swaggerConfigs = require('./auto-swagger-output.json');

// Serve Swagger docs and UI at /swagger route
const serverSwagger = (app) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerConfigs));
};

module.exports = serverSwagger;
