const express = require('express');
const bodyParser = require('body-parser');
// const dbconn = require('./databse');
const Samples = require('./model/samples');
var Db = require('./contollers/dboperations');
const dboperations = require('./contollers/dboperations');
const app = express();
var  router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  // executeStatement();
  next();
});

app.post('/api/samples',(req, res, next) => {
  const sample = req.body;
  console.log(sample,'sample');
  dboperations.addSamples(sample).then(result => {
    res.status(201).json(result);
 })
})

app.get('/api/samples',(req, res, next) =>{
  dboperations.getSamples().then(result => {
    if(result){
    res.status(200).json({
      comments: Samples.siteComments,
      message: "Posts fetched successfully!",
      samples: result[0]
    });
    } else{
      res.status(500).json({
        message: "Not fetched",
        samples: []
      })
    }
 });

});

app.use((req,res) =>{
  res.send('halo');
});

module.exports = app;
