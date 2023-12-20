const { Router } = require("express");
const sessionController = require("./session.controller");

class SessionRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/anonymous/login', sessionController.login);
    }
}

module.exports = new SessionRouter().router;
