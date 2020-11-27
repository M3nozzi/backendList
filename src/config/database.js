require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
    .connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    .then(x => {
        console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.log('Error connecting to MongoDB')
    });

module.exports = mongoose;