class BookService {
    constructor(db) {
        this.Client = db.sequelize;
        this.Book = db.Book;
        this.Genre = db.Genre;
        this.Author = db.Author;
    }

    async getBooks(){
        return this.Book.findAll({
            where: {},
            include: [this.Genre, this.Author]
        })
    }

    async queryBooks() {
        let query = `
        SELECT books.*, Authors.Author, genres.Genre, series.Series FROM books
        JOIN Authors ON Authors.id = books.AuthorId
        JOIN genres ON genres.id = books.GenreId
        JOIN series ON series.id = books.SeriesId`
        return this.Client.query(query, {
            type: this.Client.QueryTypes.SELECT
        })
    }

    async createBook(book){
        return this.Book.create({
            Title: book.title,
            AuthorId: book.authorId,
            SeriesId: book.seriesId,
            GenreId: book.genreId,
            Pages: book.pages,
            Published: book.published,
        })
    }

}

module.exports = BookService;