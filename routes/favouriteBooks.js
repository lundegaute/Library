var express = require("express");
var router = express.Router();
var db = require("../models");
var BookService = require("../services/bookService");
var bookeService = new BookService(db);
var ReadBookService = require("../services/readBookService");
var readBookService = new ReadBookService(db);
var FavouriteBookService = require("../services/favouriteBookService");
var favouriteBookService = new FavouriteBookService(db);
var auth = require("../middleware/authenticate");
var jsend = require("jsend");
router.use(jsend.middleware);


router.get("/", auth.token, async function ( req, res, next ) {
    const favouriteBooks = await favouriteBookService.queryFavouriteBooks(req.user);
    console.log(favouriteBooks)

    favouriteBooks.forEach( (favouriteBook) => {
        let newDate = new Date(favouriteBook.Published)
        favouriteBook.Published = newDate.getFullYear();
    })

    //return res.jsend.success({StatusCode: 200, Results: favouriteBooks}) // if workig with postman
    res.render("favouriteBooks", {user: req.user, favouriteBooks: favouriteBooks}) // If working with the frontend
})


router.post("/", auth.token, async function ( req, res, next) {
    const bookId = req.body.bookId;
    const favouriteBooks = await favouriteBookService.queryFavouriteBooks(req.user)
    let inFavourites = false;

    favouriteBooks.forEach( (favouriteBook) => {
        if ( bookId == favouriteBook.BookId) { // BookId is a string, and favouriteBook.BookId is int                     
            inFavourites = true;
        }
    })

    if ( !inFavourites ) {
        try {
            await favouriteBookService.addToFavouriteBook(bookId, req.user)
            return res.jsend.success({StatusCode: 200, Results: "Success"})
        } catch (error) {
            return res.jsend.fail({StatusCode: 500, Results: "Already in favourites"})
        }
    } else {
        await favouriteBookService.removeBookFromFavourites(bookId, req.user);
        return res.jsend.success({StatusCode: 200, Results: "Removed from favourites"})
    }
})


module.exports = router;