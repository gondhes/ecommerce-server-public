const request = require('supertest')
const app = require('../app')
const {generate} = require('../helpers/verifyToken')

let access_token_admin
let access_token_customer

beforeAll(function() {
    access_token_admin = generate({id: 1, email: 'admin@mail.com', role: 'admin'}, process.env.SECRET_KEY)
    access_token_customer = generate({id: 1, email: 'cust@mail.com', role: 'customer'}, process.env.SECRET_KEY)
})

describe('testing POST /products success', function () {
    it('should return response with status code 201', function(done) {
        const body = {
            name: 'Jacket',
            img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
            price: 350000,
            stock: 12,
            categoryId: 1
        }

        request(app)
        .post('/products')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
            if (err) {
                done(err)
            } else {
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name', body.name)
                expect(typeof res.body.name).toEqual('string')
                expect(res.body).toHaveProperty('img_url', body.img_url)
                expect(typeof res.body.img_url).toEqual('string')
                expect(res.body).toHaveProperty('price', body.price)
                expect(typeof res.body.price).toEqual('number')
                expect(res.body.price).toBeGreaterThanOrEqual(0)
                expect(res.body).toHaveProperty('stock', body.stock)
                expect(typeof res.body.stock).toEqual('number')
                expect(res.body.stock).toBeGreaterThanOrEqual(0)
                expect(res.body).toHaveProperty('categoryId', body.categoryId)
                expect(typeof res.body.categoryId).toEqual('number')

                done()
            }
        })
    })
}) 


describe('testing POST /products error', function () {
    describe('testing without access_token', function () {
        it('should return response with status code 403', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .post('/products')
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('authentication failed')
    
                    done()
                }
            })
        })
    })

    describe('testing with customer access_token', function () {
        it('should return response with status code 403', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .post('/products')
            .set('access_token', access_token_customer)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('not authorized')
    
                    done()
                }
            })
        })
    })

    describe('testing with an empty field', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: '',
                price: 350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('all fields should not be empty')
    
                    done()
                }
            })
        })
    })

    describe('testing with negative stock', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: -12,
                categoryId: 1
            }
    
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('stock should not be less than 0')
    
                    done()
                }
            })
        })
    })

    describe('testing with negative price', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: -350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('price should not be less than 0')
    
                    done()
                }
            })
        })
    })

    describe('testing with wrong data type', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: 'dua belas',
                categoryId: 1
            }
    
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('stock should be in number')
    
                    done()
                }
            })
        })
    })
})

// --------------------------------------------------------------------------

describe('testing PUT /products/:id success', function () {
    it('should return response with status code 201', function(done) {
        const body = {
            name: 'Jacket',
            img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
            price: 350000,
            stock: 12,
            categoryId: 1
        }

        request(app)
        .put('/products/1')
        .set('access_token', access_token_admin)
        .send(body)
        .end(function(err, res) {
            if (err) {
                done(err)
            } else {
                expect(res.statusCode).toEqual(201)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('name', body.name)
                expect(typeof res.body.name).toEqual('string')
                expect(res.body).toHaveProperty('img_url', body.img_url)
                expect(typeof res.body.img_url).toEqual('string')
                expect(res.body).toHaveProperty('price', body.price)
                expect(typeof res.body.price).toEqual('number')
                expect(res.body.price).toBeGreaterThanOrEqual(0)
                expect(res.body).toHaveProperty('stock', body.stock)
                expect(typeof res.body.stock).toEqual('number')
                expect(res.body.stock).toBeGreaterThanOrEqual(0)
                expect(res.body).toHaveProperty('categoryId', body.categoryId)
                expect(typeof res.body.categoryId).toEqual('number')

                done()
            }
        })
    })
}) 


describe('testing PUT /products/:id error', function () {
    describe('testing without access_token', function () {
        it('should return response with status code 403', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .put('/products/1')
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('authentication failed')
    
                    done()
                }
            })
        })
    })

    describe('testing with customer access_token', function () {
        it('should return response with status code 403', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .put('/products/1')
            .set('access_token', access_token_customer)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('not authorized')
    
                    done()
                }
            })
        })
    })

    describe('testing with an empty field', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: '',
                price: 350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('all fields should not be empty')
    
                    done()
                }
            })
        })
    })

    describe('testing with negative stock', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: -12,
                categoryId: 1
            }
    
            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('stock should not be less than 0')
    
                    done()
                }
            })
        })
    })

    describe('testing with negative price', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: -350000,
                stock: 12,
                categoryId: 1
            }
    
            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('price should not be less than 0')
    
                    done()
                }
            })
        })
    })

    describe('testing with wrong data type', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                name: 'Jacket',
                img_url: 'https://cdn.shopify.com/s/files/1/0231/8024/7118/products/ME-003422_Transition_Jacket_ME-01488_BrackenMagma_8ce676b9-1dcd-4bd9-985a-64d5bab6a9df_438x648_crop_center.png?v=1600684143',
                price: 350000,
                stock: 'dua belas',
                categoryId: 1
            }
    
            request(app)
            .put('/products/1')
            .set('access_token', access_token_admin)
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('stock should be in number')
    
                    done()
                }
            })
        })
    })
})

// ----------------------------------------------------


describe('testing DELETE /products/:id success', function () {
    it('should return response with status code 200', function(done) {

        request(app)
        .delete('/products/1')
        .set('access_token', access_token_admin)
        .end(function(err, res) {
            if (err) {
                done(err)
            } else {
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('msg')
                expect(res.body.error).toEqual('product deleted successfully')

                done()
            }
        })
    })
}) 

describe('testing DELETE /products/:id error', function () {
    describe('testing without access_token', function () {
        it('should return response with status code 403', function(done) {

            request(app)
            .delete('/products/1')
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('authentication failed')
    
                    done()
                }
            })
        })
    })

    describe('testing with customer access_token', function () {
        it('should return response with status code 403', function(done) {

            request(app)
            .delete('/products/1')
            .set('access_token', access_token_customer)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(403)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('not authorized')
    
                    done()
                }
            })
        })
    })
}) 
