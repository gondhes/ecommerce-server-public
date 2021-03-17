const router = require('express').Router()
const product = require('../routes/productRouter')
const userController = require('../controllers/userController')

router.use('/products', product)

router.post('/login', userController.login)

module.exports = router