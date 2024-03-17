class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
    }

    async getUserByEmail(email) {
        return this.User.findOne({
            where: {
                Email: email
            }
        })
    }

    async createUser( user ) {
        return this.User.create({
            Email: user.email,
            EncryptedPassword: user.encryptedPassword,
            Salt: user.salt,
            Role: 2,
        })
    }

}

module.exports = UserService;