# ECOMMERCE SERVER
ecommerce server is an online-shop website.

List of available endpoints:
​
- `POST /login`
- `GET /products`
- `GET /products/id`
- `POST /products`
- `PUT /products/id`
- `DELETE /products/id`

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL
* Bcryptjs
* Cors
* Jsonwebtoken
* Sequelize

Dev Dependancy
* Dotenv
* Jest
* Supertest


&nbsp;

## Global Responses
> These responses are applied globally on all endpoints

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Authentication failed"
}
```

_Response (403 - Forbidden)_
```
{
  "message": "Not authorized"
}
```

&nbsp;

## RESTful endpoints

### POST /login

> Login user

_Request Body_
```
{
    'email': 'string',
    'password': 'string'
}
```

_Response (200)_
```
 {
    'access_token': 'string'
 }
```

_Response (400 - Bad request)_
```
{
  "message": "Invalid email or password"
}
```

---
### GET /products

> Get all products list

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    {
        "name": 'string',
        "img_url": 'string',
        "price": 'integer',
        "stock": 'integer',
        "categoryId": 'integer'
    }
 }
```

---
### GET /products/id

> Get product list by id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 {
    {
        "name": 'string',
        "img_url": 'string',
        "price": 'integer',
        "stock": 'integer',
        "categoryId": 'integer'
    }
 }
```

---
### POST /products

> Create new product

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
  "name": 'string',
  "img_url": 'string',
  "price": 'integer',
  "stock": 'integer',
  "categoryId": 'integer'
}
```

_Response (201 - Created)_
```
{
    {
      "name": 'string',
      "img_url": 'string',
      "price": 'integer',
      "stock": 'integer',
      "categoryId": 'integer'
    }
}
```

_Response (400 - Bad request)_
```
{
  "errors": "Stock should be in number format",
  "errors": "Price should be in number format",
  "errors": "Stock should not be less than 0",
  "errors": "Price should not be less than 0",
  "errors": "All fields should not be empty"
}
```

---
### PUT /products/id

> Edit existing product

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
{
  "name": 'string',
  "img_url": 'string',
  "price": 'integer',
  "stock": 'integer',
  "categoryId": 'integer'
}

```

_Response (200)_
```
{
    {
      "name": 'string',
      "img_url": 'string',
      "price": 'integer',
      "stock": 'integer',
      "categoryId": 'integer'
    }
}
```

_Response (400 - Bad request)_
```
{
  "errors": "Stock should be in number format",
  "errors": "Price should be in number format",
  "errors": "Stock should not be less than 0",
  "errors": "Price should not be less than 0",
  "errors": "All fields should not be empty"
}
```

---
### DELETE /products/id

> Delete product by id

_Request Header_
```
{
  'access_token': 'access_token'
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
 OK
```
