class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.User = db.User;
        this.Role = db.Role;
    }

    async getUserByEmail(email) {
        return this.User.findOne({
            where: {
                Email: email,
            },
            include: [this.Role]
        })
    }

    async createUser( user ) {
        return this.User.create({
            Email: user.email,
            EncryptedPassword: user.encryptedPassword,
            Salt: user.salt,
            RoleId: 2,
        })
    }

}

module.exports = UserService;