var express = require("express");
var router = express.Router();
var db = require("../models");
var RoleService = require("../services/roleService");
var roleService = new RoleService(db);
var GenreService = require("../services/genreService");
var genreService = new GenreService(db);
var BookService = require("../services/bookService");
var bookService = new BookService(db);
var SeriesService = require("../services/seriesService");
var seriesService = new SeriesService(db);
var AuthorService = require("../services/authorService");
var authorService = new AuthorService(db);
var jsend = require("jsend");
router.use(jsend.middleware);


router.get("/", async function ( req, res, next ) {

    return res.jsend.success({StatusCode: 200, Results: "Working"})
})

router.post("/", async function ( req, res, next ) {
    const roles = await roleService.getRoles();
    const genres = await genreService.getGenres();
    const books = await bookService.getBooks();
    const authors = await authorService.getAuthors();
    const series = await seriesService.getSeries();
    
    if ( roles.length === 0 ) {
        await roleService.createRole("Admin")
        await roleService.createRole("User")
        console.log("Roles added")
    }
    
    if ( genres.length === 0 ) {
        await genreService.createGenre("Sci-Fi")
        await genreService.createGenre("Fantasy")
        await genreService.createGenre("Non-Fiction")
        console.log("Genres added")
    }
    
    if ( authors.length === 0 ) {
        await authorService.addAuthor("Brandon Sanderson")
        await authorService.addAuthor("Steven Erikson")
        await authorService.addAuthor("Brent Weeks")
        console.log("Authors added")
    }
    
    if ( series.length === 0 ) {
        await seriesService.addSeries("The Stormlight Archive")
        await seriesService.addSeries("Malazan Book Of The Fallen")
        await seriesService.addSeries("Mistborn")
        await seriesService.addSeries("Lightbringer")
        console.log("Series added")
    }
    
    if ( books.length === 0) {
        const bookList = [
            {
                title: "The Way Of Kings",
                authorId: 1,
                series: 1,
                genreId: 2,
                pages: 1001,
                published: "2010-08-31"
            },
            {
                title: "Words of Radiance",
                authorId: 1,
                series: 1,
                genreId: 2,
                pages: 1080,
                published: "2014-03-04"
            },
            {
                title: "Oathbringer",
                authorId: 1,
                series: 1,
                genreId: 2,
                pages: 1233,
                published: "2017-11-14"
            },
            {
                title: "Gardens of the moon",
                authorId: 2,
                series: 2,
                genreId: 2,
                pages: 657,
                published: "1999-04-01"
            },
            {
                title: "The Black Prism",
                authorId: 3,
                series: 3,
                genreId: 2,
                pages: 735,
                published: "2010-08-25"
            },
        ];
        
        for ( let book of bookList) {
            await bookService.createBook(book)
        }
        console.log("Books added")
    }
    
    return res.jsend.success({StatusCode: 200, Results: "Database initialized with genres and roles and books"})
})


module.exports = router;