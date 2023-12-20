const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split('Bearer ')[1];
        if (!token) {
            return res.status(401).send('No token provided');
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decoded);
        res.setHeader('authorization', `Bearer ${token}`);
        next();
    } catch (ex) {
        console.log(ex.message);
        return res.status(401).send(`authorization error: ${ex.message}`);
    }
};

const generateAccessToken = (userEmail, userId, username) => {
    try {
        if (!userEmail && !userId && !username) {
            console.log('No user details are provided. Application level JWT is generated');
        }

        const token = jwt.sign(
            { email: userEmail, userId, username },
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRE_DURATION
            }
        );

        return token;
    } catch (error) {
        console.error('Error generating access token:', error.message);
        return null;
    }
};

module.exports = {
    authenticate: authenticateToken,
    create: generateAccessToken
};
