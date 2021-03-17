const {Product} = require('../models')

class productController {

    static findAll(req, res, next) {
        Product.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findOne(req, res, next) {
        let id = +req.params.id
        Product.findByPk(id)
        .then(data => {
            if(!data) {
                res.status(404).json({msg: 'product not found'})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static create(req, res, next) {
        let product = {
            name: req.body.name,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock,
            categoryId: req.body.categoryId
        }

        Product.create(product)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let id = +req.params.id
        let product = {
            name: req.body.name,
            img_url: req.body.img_url,
            price: req.body.price,
            stock: req.body.stock,
            categoryId: req.body.categoryId
        }

        Product.update(product, {where: {id: id}, returning: true})
        .then(data => {
            let product = data[1][0]
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        let id = +req.params.id
        Product.destroy({where: {id: id}})
        .then(_=> {
            res.status(200).json({msg: 'product deleted successfully'})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = productController