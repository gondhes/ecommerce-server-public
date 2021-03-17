const {User, Product} = require('../models')
const {verifyToken} = require('../helpers/verifyToken')

const authentication = (req, res, next) => {
    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findOne({
            where: {id, email}
        })
        .then(user => {
            req.currentUser = {id: user.id, email: user.email, role: user.role}
            next()
        })
        .catch(err => {
            res.status(403).json({msg: 'not authorized'})
        })
    } catch (error) {
        res.status(401).json({msg: 'authentication failed'})
    }
}

const authorization = (req, res, next) => {
    let role = req.currentUser.role

    if(role == 'admin') {
        next()
    } else {
        res.status(403).json({msg: 'not authorized'})
    }
}

module.exports = {
    authentication,
    authorization
}