const cors = require('cors');
const express = require('express');

module.exports = (app) => {
    app.use(
        cors({
            origin: [
                'http://localhost:5173',
                'https://heygov-mini-crm-task-client.vercel.app'
            ],
        })
    );

    app.use(express.json());
};