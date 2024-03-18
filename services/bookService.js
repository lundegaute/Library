class BookService {
    constructor(db) {
        this.client = db.sequelize;
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

    async createBook(book){
        return this.Book.create({
            Title: book.title,
            Series: book.series,
            Pages: book.pages,
            Published: book.published,
            AuthorId: book.authorId,
            GenreId: book.genreId,
        })
    }

}

module.exports = BookService;