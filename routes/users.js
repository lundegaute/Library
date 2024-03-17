var express = require('express');
var router = express.Router();
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
    
    if ( !crypto.timingSafeEqual( checkEncryptedPassword(password), user.EncryptedPassword)) {
        return res.jsend.fail({StatusCode: 401, Results: "Invalid password"})
    }
    
    let token = jwt.sign(
        {
            id: user.id,
            email: user.Email,
            role: user.Role
        },
        process.env.TOKEN_SECRET,
        {expiresIn: "2h"}
    )

    return res.jsend.success({StatusCode: 200, Results: "Login Successful"})
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

    // creating encrypted password and salt
    const {encryptedPassword, salt } = await createEncryptedPassword(user.password)

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


module.exports = router;
