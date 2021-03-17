const request = require('supertest')
const app = require('../app')

describe('testing POST /login success', function () {
    it('should return response with status code 200', function(done) {
        const body = {
            email: 'admin@mail.com',
            password: '123456'
        }

        request(app)
        .post('/login')
        .send(body)
        .end(function(err, res) {
            if (err) {
                done(err)
            } else {
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('role')
                expect(typeof res.body.role).toEqual('string')
                expect(res.body).toHaveProperty('email', body.email)
                
                done()
            }
        })
    })
}) 


describe('testing POST /login error', function () {
    describe('testing wrong password', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                email: 'admin@mail.com',
                password: '654321'
            }
    
            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('invalid email or password')
    
                    done()
                }
            })
        })
    })

    describe('testing wrong email', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                email: 'amin@mail.com',
                password: '123456'
            }
    
            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('invalid email or password')
    
                    done()
                }
            })
        })
    })

    describe('testing empty email and password', function () {
        it('should return response with status code 400', function(done) {
            const body = {
                email: '',
                password: ''
            }
    
            request(app)
            .post('/login')
            .send(body)
            .end(function(err, res) {
                if (err) {
                    done(err)
                } else {
                    expect(res.statusCode).toEqual(400)
                    expect(typeof res.body).toEqual('object')
                    expect(res.body).toHaveProperty('error')
                    expect(res.body.error).toEqual('email and password is required')
    
                    done()
                }
            })
        })
    })
})