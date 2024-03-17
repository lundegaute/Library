var express = require("express");
var router = express.Router();
var jsend = require("jsend");

//var auth = require("../middleware/authenticate");
router.use(jsend.middleware);

router.get("/", async function ( req, res, next ) {
    

    return res.jsend.success({StatusCode: 200, Results: "List of all books"})
})


module.exports = router;