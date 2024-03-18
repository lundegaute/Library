var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var db = require("../models");
var UserService = require("../services/userService");
var userService = new UserService(db);
var jsend = require("jsend");
var checkEncryptedPassword = require("../middleware/createEncryptedPassword");
var createEncryptedPassword = require("../middleware/createEncryptedPassword");
router.use(jsend.middleware);


router.get('/', async function(req, res, next) {
    res.jsend.success({"StatusCode": 200, "Result": "Success"});
});


router.post("/login", async function ( req, res, next ) {
    const {email, password } = req.body;
    const user = await userService.getUserByEmail(email)

    // If email or password is empty, tell user
    if ( !email ) {
        return res.jsend.fail({StatusCode: 401, Results: "Email can not be empty"})
    } else if ( !password ) {
        return res.jsend.fail({StatusCode: 401, Results: "Password can not be empty"})
    }
    
    // If Email is not found in database
    if ( !user ) {
        return res.jsend.fail({StatusCode: 401, Results: "Invalid email"})
    }
    const data = await checkEncryptedPassword(password, user.Salt);
    if ( !crypto.timingSafeEqual( data.encryptedPassword, user.EncryptedPassword)) {
        return res.jsend.fail({StatusCode: 401, Results: "Invalid password"})

    }

    try {
        let token = jwt.sign(
            {
                id: user.id,
                Email: user.Email,
                Role: user.Role.Role,
            },
            process.env.TOKEN_SECRET,
            {expiresIn: "2h"}
        )
        res.cookie("token", token, { httpOnly: true});
        res.render("index", {user: user.Email, title: "Express", token: token})
    } catch (error) {
        console.log(error)
        return res.jsend.fail({StatusCode: 500, Results: "Error during login", error: error})
    }

})

router.post("/signup", async function ( req, res, next ) {
    const user = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if ( !user.email || !user.password ) {
        return res.jsend.fail({StatusCode: 401, Results: "Email or password can not be empty"})
    }

    if ( !emailRegex.test(user.email)) {
        return res.jsend.fail({StatusCode: 401, Results: "Invalid Email format"})
    }

    // creating encrypted password and salt. Sending an empty salt when creating user. The function will make a new one
    const {encryptedPassword, salt } = await createEncryptedPassword(user.password, "")

    user.encryptedPassword = encryptedPassword;
    user.salt = salt;

    try {
        await userService.createUser(user)
        return res.jsend.success({StatusCode: 200, Results: "User created"})
    } catch (error) {
        console.log(error)
        return res.jsend.success({StatusCode: 500, Results: "Error during user creation", Error: error})
    }

})


router.post("/logout", async function ( req, res, next ) {
    req.user = undefined;
    res.redirect("/");
})


module.exports = router;
