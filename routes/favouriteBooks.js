var express = require("express");
var router = express.Router();
var db = require("../models");
var BookService = require("../services/bookService");
var bookeService = new BookService(db);
var ReadBookService = require("../services/readBookService");
var readBookService = new ReadBookService(db);
var favouriteBookService = require("../services/favouriteBookService");
var favouriteBookService = new favouriteBookService(db);

var jsend = require("jsend");
router.use(jsend.middleware);


router.get("/", auth.token, async function ( req, res, next ) {
    const favouriteBooks = await favouriteBookService.getFavouriteBooks(req.user);



    res.render("favouriteBooks", {user: req.user, books: favouriteBooks})
})







module.exports = router;