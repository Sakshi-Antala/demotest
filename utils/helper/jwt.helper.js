const jwt = require('jsonwebtoken');

function getJWTToken(data) {
    console.log("data-------djhfdhfjkjhfu", data)
    const token = `${jwt.sign(data, 'mySecretkey')}`;
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, 'mySecretkey', function (err, decoded) {
        console.log("decoded------------->",decoded);
        if (err) {
            console.log(err);
            return err;
            // res.send("Email verification failed,   possibly the link is invalid or expired");
        }
        else {
            // const data="Email verifified successfully";
            return decoded;
            // res.send("Email verifified successfully");
        }
    });
}


module.exports = { verifyToken, getJWTToken };