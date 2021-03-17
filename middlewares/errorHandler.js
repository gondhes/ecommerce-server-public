const express = require("express");

function errorHandler (err, req, res, next) {
    if (err.name === "SequelizeValidationError") {
        let errors = err.errors.map(error => error.message);

        res.status(400).json({errors})
    } else if (err.code === 400) {
        res.status(err.code).json({error: err.msg});
    } else if (err.code === 401) {
        res.status(err.code).json({error: err.msg});
    } else if (err.code === 403) {
        res.status(err.code).json({error: err.msg});
    } else if (err.code === 404) {
        res.status(err.code).json({error: err.msg});
    } else {
        res.status(500).json({error: err.msg});
    }
}

module.exports = errorHandler