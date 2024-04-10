class FavouriteBookService {
    constructor(db) {
        this.Client = db.sequelize;
        this.FavouriteBook = db.favouriteBook;
    }

    async queryFavouriteBooks(user) {
        let query = `
        SELECT favouriteBooks.*, books.*, Authors.Author, genres.Genre, series.Series FROM favouriteBooks
        JOIN books ON books.id = favouriteBooks.BookId
        JOIN Authors ON Authors.id = books.AuthorId
        JOIN genres ON genres.id = books.GenreId
        JOIN series ON series.id = books.SeriesId
        WHERE favouriteBooks.UserId = :userId `
        return this.Client.query( query, {
            type: this.Client.QueryTypes.SELECT,
            replacements: { userId: user.id } // This is to prevent sql injection attacks
        })
    }                

    async addToFavouriteBook(bookId, user){
        return this.FavouriteBook.create({
            BookId: bookId,
            UserId: user.id,
        })
    }

    async removeBookFromFavourites(bookId, user) {
        return this.FavouriteBook.destroy({
            where: {
                BookId: bookId,
                UserId: user.id
            }
        })
    }

}

module.exports = FavouriteBookService;