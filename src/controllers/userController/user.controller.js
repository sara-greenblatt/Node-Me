const User = require('../../models/user.model');
const userRepository = require('../../respositories/user.repository');

class UserController {
    // create new user
    async createUser(req, res) {

        /*  #swagger.parameters['header'] = {
             in: 'header',
             name: 'authorization',
             required: true,
             description: 'Token associated to client session'
        } */

        /*  #swagger.parameters['body'] = {
             in: 'body',
             description: 'New user',
             schema: { user: { $ref: "#/definitions/User" } }
        } */

        if (!req.body?.user) {
            console.log('body', req.query, req.parameters);
            res.status(400).send({ message: "Invalid request Schema" });
            return;
        }
        const { name, password, email } = req.body.user;
        if (!name || !password || !email) {
            /* #swagger.responses[500] = { 
                description: "Username and password are required" 
            } */
            res.status(500).send({ message: "Username and password are required" });
        }
        try {
            const newUser = new User(req.body.user);
            const savedUser = await userRepository.createNewUser(newUser);
            if (savedUser?.error) {
                res.status(500).send({ message: savedUser?.error?.message });
                return;
            }
            /* #swagger.responses[200] = { 
           schema: { "$ref": "#/definitions/User" },
           description: "User registered successfully." 
         } */
            res.status(200).send(newUser);
            return;
        } catch (error) {
            console.error(error);
        }
    }

    async fetchUserDetails(req, res) {

        /*  #swagger.parameters['name'] = {
             in: 'query',
             type: 'string',
             required: true,
             description: 'User name'
            } 
        */

        /*  #swagger.parameters['header'] = {
            in: 'header',
            name: 'authorization',
            required: true,
            description: 'Token associated to client session'
       } */

        const { name } = req.query || {};
        if (!name) {
            /* #swagger.responses[500] = { 
                description: "Use name is required." 
          } */
            res.status(500).send({ message: "User Name is required" });
            return;
        }
        try {
            const userDetails = await userRepository.fetchUserDetails(name);
            if (userDetails?.error) {
                res.status(500).send({ message: `Internal server error: ${userDetails.error}` });
                return;
            }
            if (!Object.keys(userDetails?.results || {}).length) {
                res.status(500).send({ message: "User not found" });
                return;
            }
            /* #swagger.responses[200] = { 
              schema: { "$ref": "#/definitions/User" },
              description: "User fetched successfully." 
            } */
            return res.status(200).send({ ...userDetails?.results?.[0] });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new UserController();
