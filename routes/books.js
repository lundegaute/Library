var express = require("express");
var router = express.Router();
var jsend = require("jsend");
var db = require("../models");
var BookService = require("../services/bookService");
var bookService = new BookService(db);
var auth = require("../middleware/authenticate");
router.use(jsend.middleware);


router.get("/", auth.token, auth.isUser, async function (req, res, next) {
    const books = await bookService.getBooks()

    res.render("books", {user: req.user, books: books})
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
