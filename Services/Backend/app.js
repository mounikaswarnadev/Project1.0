const express = require('express');
const config = require('./databse');

const app = express();

app.use((req, res, next) => {
    console.log('helo here');
    // sql.getdata();
    next();
});

app.use((req, res, next) => {
    res.send('rajesh from express');
});

module.exports = app;