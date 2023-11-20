const userRouter = require('./userController/user.route');

class Routes {
    constructor(app) {
        app.use('/user', userRouter);
    }
}

module.exports = Routes;
