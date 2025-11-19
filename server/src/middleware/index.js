const cors = require('cors');
const express = require('express');

module.exports = (app) => {
    app.use(
        cors({
            origin: [
                'http://localhost:5173'
            ],
        })
    );

    app.use(express.json());
};