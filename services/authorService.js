class AuthorService {
    constructor(db) {
        this.Client = db.sequelize;
        this.Author = db.Author;
    }

    async getAuthors(){
        return this.Author.findAll(
            {
                where: {},
            },
            {
                order: [["asc"]]
            })
    }

    async addAuthor(author) {
        return this.Author.create({
            Author: author
        })
    }

    async updateAuthor(authorId, updatedAuthor){
        return this.Author.update(
            {
                Author: updatedAuthor
            },
            {
                where: {
                    id: authorId
                }
            }
        )
    }

}

module.exports = AuthorService;