const { Router } = require("express");
const userController = require("./user.controller");

class UserRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/create', userController.createUser);
        this.router.get('/details', userController.fetchUserDetails);
    }
}

module.exports = new UserRouter().router;
