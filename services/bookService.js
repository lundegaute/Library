class BookService {
    constructor(db) {
        this.client = db.sequelize;
        this.Book = db.Book;
    }
}

module.exports = BookService;