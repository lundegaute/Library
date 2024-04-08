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
        WHERE readBooks.UserId = ${user.id}`
        return this.Client.query(query, { 
            type: this.Client.QueryTypes.SELECT,
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