const express = require('express');
// const db = require('./dbconn');
// const sql = require('./dbconfig');
const config = require('./databse');

const app = express();



// db.('SELECT * FROM dbo.Applications');

app.use((req, res, next) => {
    console.log('helo here');
    // sql.getdata();
    next();
});

app.use((req, res, next) => {
    res.send('rajesh from express');
});

module.exports = app;