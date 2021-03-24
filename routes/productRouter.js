const router = require('express').Router()
const productController = require('../controllers/productController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/', productController.findAll)
router.get('/:id', productController.findOne)
router.use(authentication)
router.post('/', authorization, productController.create)
router.put('/:id', authorization, productController.update)
router.delete('/:id', authorization, productController.delete)

module.exports = router