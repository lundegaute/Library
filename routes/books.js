var express = require('express');
var router = express.Router();
var jsend = require("jsend");
var db = require("../models");
var BookService = require("../services/bookService");
var bookService = new BookService(db);
router.use(jsend.middleware);

router.get('/', async function(req, res, next) {
  res.jsend.success({"StatusCode": 200, "Result": "Success"});
});

module.exports = router;