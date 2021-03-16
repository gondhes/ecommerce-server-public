const {User} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const {generate} = require('../helpers/verifyToken')

class userController {

    static login(req, res) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({where: {email}})
        .then(user => {
            if(user) {
                const comparedPassword = comparePassword(password, user.password)
                if(comparedPassword) {
                    const access_token = generate({id: user.id, email: user.email}, process.env.SECRET_KEY)
                    res.status(200).json({access_token, id: user.id, email: user.email, role: user.role})
                } else {
                    res.status(400).json({error: 'invalid email or password'})
                }
            } else if(email == '' || password == '') {
                res.status(400).json({error: 'email and password is required'})
            } else {
                res.status(400).json({error: 'invalid email or password'})
            }
        })
        .catch(err => {
            res.status(500).json({error: 'internal server error'})
        })
    }
}

module.exports = userController