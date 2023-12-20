const baseController = require('./baseController/base.route');
const userRouter = require('./userController/user.route');
const sessionRouter = require('./sessionController/session.route');

class Routes {
    constructor(app) {
        app.use(baseController);
        app.use('/user', userRouter);
        app.use('/session', sessionRouter);
    }
}

module.exports = Routes;
