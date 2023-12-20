// const User = require('../../models/user.model');
const userRepository = require('../../respositories/user.repository');
const { serverAuthorization } = require('../../serverUtils');
const User = require('../../models/user.model');

class SessionController {
    // login to start new session
    async login(req, res) {

        /*  #swagger.parameters['body'] = [{
             in: 'body',
             description: 'User object for login',
             schema: { user: { $ref: "#/definitions/User" } }   
      }] */

        if (!req.body?.user) {
            console.log('body', req.query, req.parameters);
            res.status(400).send({ message: "Invalid request Schema" });
            return;
        }
        const { name, password } = req.body.user;
        if (!name || !password) {
            /* #swagger.responses[500] = { 
                description: "Username and password are required" 
            } */
            res.status(500).send({ message: "Username and password are required" });
        }
        try {
            /* #swagger.responses[200] = { 
           schema: { "$ref": "#/definitions/User" },
           description: "User registered successfully." 
         } */
            const fetchedUser = await userRepository.fetchUserDetails(name, password);
            const validUser = User.fromDALUser(fetchedUser?.results?.[0]);
            if (validUser) {
                const userToken = serverAuthorization.create(
                    validUser.email, validUser.id, validUser.name
                );
                if (userToken === null) {
                    res.status(500).send('Could not generate token');
                }
                res.setHeader('authorization', `Bearer ${userToken}`);
            }
            res.status(200).send('Logged in successfully');
            return;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new SessionController();
