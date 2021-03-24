const router = require('express').Router()
const product = require('../routes/productRouter')
const userController = require('../controllers/userController')

router.use('/products', product)

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router