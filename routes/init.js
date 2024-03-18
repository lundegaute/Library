var express = require("express");
var router = express.Router();
var db = require("../models");
var RoleService = require("../services/roleService");
var roleService = new RoleService(db);
var GenreService = require("../services/genreService");
var genreService = new GenreService(db);
var jsend = require("jsend");

router.use(jsend.middleware);

router.get("/", async function ( req, res, next ) {

    return res.jsend.success({StatusCode: 200, Results: "Working"})
})

router.post("/", async function ( req, res, next ) {
    const roles = await roleService.getRoles();
    const genres = await genreService.getGenres();
    
    if ( roles.length === 0 ) {
        await roleService.createRole("Admin")
        await roleService.createRole("User")
    }
    if ( genres.length === 0 ) {
        await genreService.createGenre("Sci-Fi")
        await genreService.createGenre("Fantasy")
        await genreService.createGenre("Non-Fiction")
    }
    
    return res.jsend.success({StatusCode: 200, Results: "Database initialized with genres and roles"})
})


module.exports = router;