var express = require("express");
var router = express.Router();
var auth = require("../middleware/authenticate");
var db = require("../models");
var BookService = require("../services/bookService");
var bookService = new BookService(db);
var ReadBookService = require("../services/readBookService");
var readBookService = new ReadBookService(db);
var FavouriteBookService = require("../services/favouriteBookService");
var favouriteBookService = new FavouriteBookService(db);
var jsend = require("jsend");
router.use(jsend.middleware);


router.post("/readBooks", auth.token, async function ( req, res, next ) {
    const search = req.body.search;
    const readBooks = await readBookService.searchBooks(req.user, search);
    const favouriteBooks = await favouriteBookService.queryFavouriteBooks(req.user);

    readBooks.forEach( (book) => {
        let newDate = new Date(book.Published);
        book.Published = newDate.getFullYear();
    })

    if ( !search ) {
        return res.redirect("/readBooks")
    } else {
        try {
            console.log(readBooks)
            return res.render("readBooks", { user: req.user, books: readBooks, favouriteBooks: favouriteBooks});
        } catch (error) {
            throw error
        }
    }

})


module.exports = router;