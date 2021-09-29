const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
// const dbconn = require('./databse');
const Samples = require('./model/samples');
var Db = require('./contollers/dboperations');
const dboperations = require('./contollers/dboperations');
const app = express();
var  router = express.Router()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use("/", express.static(path.join(__dirname, "angular")));
app.use(express.static(process.cwd()+"/Artemis1.0/dist/Artemis/"));


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
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "angular", "index.html"));
// });

app.post('/api/samples',(req, res, next) => {
  const sample = req.body;
  console.log(sample,'sample');
  dboperations.addSamples(sample).then(result => {
    res.status(201).json(result);
 })
})
app.post('/api/editsample',(req,res) =>{
  const editdate = req.body;
  console.log(editdate,'editdate');

  dboperations.editsample(editdate).then(result =>{
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
    };
 });

});

app.get('/api/samples/:ArtemisID', (req, res) =>{
  dboperations.getSample(req.params.ArtemisID).then((data) =>{
    dboperations.getComments(req.params.ArtemisID).then((comments) => {
      if(comments){
        res.status(200).json({
          comments: comments[0],
          message: "Posts fetched successfully!",
          samples: data[0]
        });
      }
    })
  })
})

app.use((req,res) =>{
  res.send('halo');
});

module.exports = app;
