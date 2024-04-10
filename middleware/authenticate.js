const jwt = require("jsonwebtoken");

const auth = {
    token: ( req, res, next ) => {
        let token;
        if ( req.headers.authorization ) { // If we find a token in the headers, we go here
            token = req.headers.authorization.split(" ")[1];
        }
        else if ( req.cookies.token) { // If we dont find a headers token, but we find a cookies token, we go here
            token = req.cookies.token
        } else {
            //return res.jsend.fail({StatusCode: 500, Results: "No token found"});
            req.user = "";
            next();
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if ( err ) { // If token is invalid, we go to login page
                res.redirect("/users/login");
                //return res.jsend.fail({StatusCode: 500, Results: "Invalid token"}) // if working with postman
            }
            req.user = decodedToken;
            console.log(req.user);
            next();
        })


    },

    isAdmin: (req, res, next) => {
        if ( req.user.Role === "Admin" ) {
            next();
        } else {
            res.jsend.fail({StatusCode: 401, Results: "Unauthorized access"})
            //res.redirect("/");
        }
    },

    isUser: (req, res, next) => {
        if ( req.user.Role === "User" || req.user.Role === "Admin" ) {
            next();
        } else {
            res.jsend.fail({StatusCode: 401, Results: "Unathorized access"});
            //res.redirect("/");
        }
    },
}





module.exports = auth;