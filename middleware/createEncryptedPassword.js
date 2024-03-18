const crypto = require("crypto");

const createEncryptedPasswordAndSalt = (password,salt) => {
    return new Promise( (resolve, reject) => {
        if ( salt === ""){
            salt = crypto.randomBytes(16);
        }
        crypto.pbkdf2(
            password,
            salt,
            310000,
            32,
            "sha256",
            async function ( err, encryptedPassword ) {
                if ( err ) {
                    console.log(err)
                    reject(err);
                } else {
                    let data = { encryptedPassword, salt }
                    resolve(data);
                }
            }
        )
    })
}   

module.exports = createEncryptedPasswordAndSalt;