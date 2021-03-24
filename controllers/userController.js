const {User} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const {generate} = require('../helpers/verifyToken')

class userController {

    static login(req, res, next) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({where: {email}})
        .then(user => {
            if(user) {
                const comparedPassword = comparePassword(password, user.password)
                if(comparedPassword) {
                    const access_token = generate({id: user.id, email: user.email}, process.env.SECRET_KEY)
                    res.status(200).json({access_token, id: user.id, email: user.email, role: user.role})
                    console.log(access_token);
                } else {
                    next({code: 400, msg: 'invalid email or password'})
                }
            } else if(email == '' || password == '') {
                next({code: 400, msg: 'email and password is required'})
            } else {
                next({code: 400, msg: 'invalid email or password'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static register(req, res) {
        let user = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(user)
        .then(data => {
            res.status(201).json({success: true, msg: 'User created successfully'})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }
}

module.exports = userController