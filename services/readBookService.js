class ReadBookService {
    constructor(db) {
        this.Client = db.sequelize;
        this.ReadBook = db.readBook;
    }

    async getReadBooks(user) {
        return this.ReadBook.findAll({
            where: {
                UserId: user.id
            }
        })
    }

    async queryReadBooks(user) { // This needs to be fixed in MySql! 
        let query = `
        SELECT readbooks.*, books.*, Authors.*, genres.Genre, series.Series FROM readbooks
        JOIN Books ON books.id = readBooks.BookId
        JOIN Authors ON Authors.id = books.AuthorId
        JOIN genres ON genres.id = books.GenreId
        JOIN series ON series.id = books.SeriesId
        WHERE readBooks.UserId = :userId`
        return this.Client.query(query, { 
            type: this.Client.QueryTypes.SELECT,
            replacements: { userId: user.id}
        }) 
    }

    async searchBooks(user, search) {
        const query = `
        SELECT readbooks.*, books.*, Authors.*, genres.Genre, series.Series FROM readbooks
        JOIN Books ON books.id = readBooks.BookId
        JOIN Authors ON Authors.id = books.AuthorId
        JOIN genres ON genres.id = books.GenreId
        JOIN series ON series.id = books.SeriesId
        WHERE readBooks.UserId = :userId
        AND books.Title LIKE :titleSearch
        OR authors.Author LIKE :authorSearch
        OR series.Series LIKE :seriesSearch
        OR genres.Genre LIKE :genreSearch
        ORDER BY books.id
        `
        return this.Client.query(query, {
            replacements: {
                userId: user.id,
                titleSearch: `%${search}%`,
                authorSearch: `%${search}%`,
                seriesSearch: `%${search}%`,
                genreSearch: `%${search}%`,
            },
            type: this.Client.QueryTypes.SELECT
        })
    }


    async addBook(bookId, user) {
        return this.ReadBook.create({
            BookId: bookId,
            UserId: user.id,
        })
    }

}

module.exports = ReadBookService;