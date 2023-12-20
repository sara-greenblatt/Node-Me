const { Router } = require("express");

class BaseRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', (req, res) => {
            /*  #swagger.parameters['body'] = {
                 in: 'header',
                 name: 'authorization',
                 required: true,
                 description: 'Token associated to client session'
            } */
            console.log('request received', req.url);
            res.send('Welcome to Node Me !!'); // Temporary response
        });
    }
}

module.exports = new BaseRouter().router;
