const jwt = require("jsonwebtoken");

const auth = {
    token: ( req, res, next ) => {
        let token;
        if ( req.headers.authorization ) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if ( req.cookies.token) {
            token = req.cookies.token
        } else {
            return res.jsend.fail({StatusCode: 500, Results: "No token found"});
        }

        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if ( err ) {
                return res.jsend.fail({StatusCode: 500, Results: "Invalid token"})
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