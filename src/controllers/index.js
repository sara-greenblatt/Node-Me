const baseController = require('./baseController/base.route');
const userRouter = require('./userController/user.route');

class Routes {
    constructor(app) {
        app.use(baseController);
        app.use('/user', userRouter);
    }
}

module.exports = Routes;
