'use strict';

const Glue = require('@hapi/glue');
const mongoose = require('mongoose')
require('dotenv').config()

// const dotenv = require('dotenv')
// dotenv.config()
const manifest = require('./manifest')

const options = {
    relativeTo: __dirname
};

const startServer = async function () {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log("Database Connected");
        })
        const server = await Glue.compose(manifest, options);
        await server.start();
        console.log(`Server started on port ${manifest.server.port}`);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();