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

router.get("/onlyBooks", auth.token, async function ( req, res, next ) {
    const readBooks = await readBookService.queryReadBooks(req.user)
    
    return res.jsend.success({StatusCode: 200, Results: readBooks})
})

// loading page with all books from the have read list
router.get("/", auth.token, async function ( req, res, next ) {
    let readBooks = await readBookService.queryReadBooks(req.user);
    let favouriteBooks = await  favouriteBookService.queryFavouriteBooks(req.user);
    readBooks.forEach( (book) => {
        let date = new Date(book.Published)
        book.Published = date.getFullYear();
    })

    res.render("readBooks", {user: req.user, books: readBooks, favouriteBooks: favouriteBooks})
    //return res.jsend.success({StatusCode: 200, Results: readBooks}) // If using postman
})


// Adding books to the have read list
router.post("/", auth.token, async function ( req, res, next ) {
    const bookId = req.body.bookId;
    console.log(bookId)

    if ( !bookId ) {
        return res.jsend.fail({StatusCode: 401, Results: "No book found"})
    }

    try {
        await readBookService.addBook(bookId, req.user);
        return res.jsend.success({StatusCode: 200, Results: "Book added"})
    } catch (error) {
        console.log(error)
        return res.jsend.fail({StatusCode: 500, Results: "Error", error: error})
    }

})


module.exports = router;