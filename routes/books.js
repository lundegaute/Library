var express = require("express");
var router = express.Router();
var jsend = require("jsend");
var db = require("../models");
var BookService = require("../services/bookService");
var bookService = new BookService(db);
var ReadBookService = require("../services/readBookService");
var readBookService = new ReadBookService(db);
var auth = require("../middleware/authenticate");
router.use(jsend.middleware);


router.get("/", auth.token, auth.isUser, async function (req, res, next) {
    let books = await bookService.queryBooks()
    let readBooks = await readBookService.queryReadBooks(req.user);

    books.forEach( (book) => {
        let date = new Date(book.Published)
        book.Published = date.getFullYear();
    })

    res.render("books", {user: req.user, books: books, readBooks: readBooks})
    //res.jsend.success({StatusCode: 200, Results: books})
});


router.post("/", auth.token, auth.isUser, async function ( req, res, next ) {
    const book = req.body;
    console.log(book);

    try {
        await bookService.createBook(book);
        return res.jsend.success({StatusCode: 200, Results: "Book added successfully"});
    } catch (error) {
        return res.jsend.fail({StatusCode: 500, Results: "Error", error: error})
    }

})





module.exports = router;
