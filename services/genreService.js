class GenreService {
    constructor(db) {
        this.Client = db.sequelize;
        this.Genre = db.Genre;
    }

    async getGenres() {
        return this.Genre.findAll({
            where: {}
        })
    }

    async createGenre(genre) {
        return this.Genre.create({
            Genre: genre
        })
    }

    async updateGenre(genreId, updatedGenre) {
        return this.Genre.update(
            {
                Genre: updatedGenre
            },
            {
                where: {
                    id: genreId
                }
            }
        )
    }

    

}

module.exports = GenreService;