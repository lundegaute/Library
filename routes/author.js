var express = require("express");
var router = express.Router();
var jsend = require("jsend");
var db = require("../models");
var AuthorService = require("../services/authorService");
var authorService = new AuthorService(db);
router.use(jsend.middleware);


router.get("/", async function ( req, res, next ) {
    const authors = await authorService.getAuthors();

    try {
        return res.jsend.success({StatusCode: 200, Results: authors})
    } catch (error) {
        return res.jsend.fail({StatusCode: 500, Results: "Error", error: error})
    }

    
})

router.post("/", async function ( req, res, next ) {
    const {author} = req.body;
    console.log(author)

    if ( !author ) {
        return res.jsend.fail( {StatusCode: 401, Results: "Author can not be empty"})
    }


    try {
        await authorService.addAuthor(author);
        return res.jsend.fail( {StatusCode: 200, Results: "Author added successfully"})
    } catch (error) {
        return res.jsend.fail( {StatusCode: 500, Results: "error", error: error})
    }

})

router.put("/", async function ( req, res, next ) {
    const {authorId, updatedAuthor} = req.body;

    if ( !authorId || !updatedAuthor ) {
        return res.jsend.fail({StatusCode: 401, Results: "Invalid data"})
    }
    
    try {
        await authorService.updateAuthor(authorId, updatedAuthor);
        return res.jsend.success({StatusCode: 200, Results: "Author updated successfully"})
    } catch (error) {
        return res.jsend.fail({StatusCode: 500, Results: "Error", error: error})
    }

})

module.exports = router;