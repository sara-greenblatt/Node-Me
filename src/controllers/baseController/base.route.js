const { Router } = require("express");

class BaseRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        /**
        * @swagger
        * /api/:
        *   get:
        *     summary: Retrieve something
        *     responses:
        *       200:
        *         description: Successful   ly retrieved something
        */
        this.router.get('/', (req, res) => {
            console.log('request received', req.url);
            res.send('Hello World!'); // Temporary response
        });
    }
}

module.exports = new BaseRouter().router;
