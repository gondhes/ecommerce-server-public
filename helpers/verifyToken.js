const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}

function generate(payload){
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = {
    verifyToken,
    generate
}