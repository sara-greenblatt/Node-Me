class User {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
        this.name = user.password;
        this.id = user.id;
        this.createdAt = user.createdAt;
    }

    static fromDALUser = (dalUser) => {
        if (dalUser) {
            return new User({
                email: dalUser.email,
                password: dalUser.password,
                name: dalUser.name,
                id: dalUser.user_id,
                createdAt: dalUser.created_at
            });
        }
        return null;
    };
}

module.exports = User;
