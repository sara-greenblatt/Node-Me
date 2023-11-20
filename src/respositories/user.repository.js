const SqlRunner = require('./index');

class UserRepository {
    async fetchUserDetails(userName) {
        const queryResults = await SqlRunner.run([{
            query: 'SELECT * FROM users where userName=?',
            params: [userName]
        }]);
        return queryResults?.[0];
    };

    async createNewUser(userDetails) {
        const queryResults = await SqlRunner.run([{
            query: 'INSERT INTO users (userName, email, password) VALUES (?, ?, ?)',
            params: [userDetails.name, userDetails.email, userDetails.password]
        }]);
        if (queryResults?.[0]?.error) {
            return queryResults[0];
        } if (!SqlRunner.utils.checkInsertOutput(queryResults[0].results)) {
            queryResults[0].error = new Error('User creation failed');
        }
        return queryResults?.[0];
    };
}

module.exports = new UserRepository();