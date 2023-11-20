const dbConnection = require('./index');

class UserRepository {
    fetchUserDetails(userName) {
        return new Promise((resolve, reject) => {
            dbConnection.query('SELECT * FROM users where userName=?',
                [userName],
                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    resolve(results?.[0]);
                })
        });
    }
}

module.exports = new UserRepository();