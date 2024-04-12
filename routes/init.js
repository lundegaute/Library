var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
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


// Filling database with books from a csv file
router.post("/csv", async function ( req, res, next ) {
    const filePath = path.join(__dirname, "..", "/public/csv"); // Path to csv file with books data
    const booksData = fs.readFileSync(path.join(filePath, "Bokliste.csv"), "utf-8"); // reading contents of csv file
    let booksToAdd = [];
    let listData = booksData.split("\n"); // creates a list where each element is each line
    let keyIndex = { // Finding the index of each header
        title: listData[0].split(",").indexOf("Bok"),
        author: listData[0].split(",").indexOf("Forfatter"),
        series: listData[0].split(",").indexOf("Serie"),
        genre: listData[0].split(",").indexOf("Genre"),
        pages: listData[0].split(",").indexOf("Antall sider"),
        published: listData[0].split(",").indexOf("År utgitt"),
    }
    
    for ( let line of listData.slice(1) ) { // Creating an object from each line, and adding it to a list
        let bookList = line.split(",");
        let bookObject = {
            title: bookList[keyIndex.title],
            author: bookList[keyIndex.author],
            series: bookList[keyIndex.series],
            genre: bookList[keyIndex.genre],
            pages: bookList[keyIndex.pages],
            published: bookList[keyIndex.published],
        }
        booksToAdd.push(bookObject);
    }

    // Adding authors, genre and series to database
    // Check later if all these can go into one for loop
    for ( let book of booksToAdd) {
        try {
            await authorService.addAuthor(book.author);
        } catch (error) {
            continue;
            //throw error
        }
    }
    for ( let book of booksToAdd) {
        try {
            await seriesService.addSeries(book.series);
        } catch (error) {
            continue;
            //throw error
        }
    }
    for ( let book of booksToAdd) {
        try {
            await genreService.createGenre(book.genre);
        } catch (error) {
            continue;
            //throw error
        }
    }
    
    // -------------------- Adding books to database
    // booksToAdd
    const authors = await authorService.getAuthors();
    const genres = await genreService.getGenres();
    const series = await seriesService.getSeries();

    for ( let book of booksToAdd ) {
        for ( let author of authors ) {
            if ( book.author === author.Author) {
                book.authorId = author.id;
            }
        }
        for ( let genre of genres ) {
            if ( book.genre === genre.Genre) {
                book.genreId = genre.id;
            }
        }
        for ( let serie of series) {
            if ( book.series === serie.Series) {
                book.seriesId = serie.id;
            }
        }
        console.log(book)
        try {
            await bookService.createBook(book)
        } catch (error) {
            continue;
            //throw error
        }

    }

    return res.jsend.success({StatusCode: 200, Results: "Books added successfully"})
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
        await genreService.createGenre("Sci-fi")
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