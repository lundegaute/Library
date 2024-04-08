var express = require("express");
var router = express.Router();
var jsend = require("jsend");
var auth = require("../middleware/authenticate");

router.get("/", auth.token, async function ( req, res, next ) {
    const user = req.user;

    if ( user === "" ) {
        res.redirect("/users/login");
    } else {
        res.redirect("/dashboard")
    }
    
})

router.get("/dashboard", auth.token, auth.isUser, async function ( req, res, next ) {

    res.render("index", { user: req.user, })
})


module.exports = router;