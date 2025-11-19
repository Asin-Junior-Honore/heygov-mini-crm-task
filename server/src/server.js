const express = require('express');
const dotenv = require('dotenv');
dotenv.config();


const createDatabaseConnection = require('./config/db');
const applyMiddleware = require('./middleware');
const routes = require('./routes');
const errorHandler = require('./utils/errorHandler');


const PORT = process.env.PORT || 4000;


async function start() {
    try {
        await createDatabaseConnection();


        const app = express();


        // global middleware
        applyMiddleware(app);


        app.use('/api', routes);

        app.use(errorHandler.notFound);
        app.use(errorHandler.handler);


        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}


start();