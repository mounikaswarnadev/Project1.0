var Connection = require('tedious').Connection;
// const app = require('./app');
var config = {
    server: 'artemis-inventory.public.ec670bc17eaf.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'RajeshD',  //update me
            password: 'ArtemisRajesh2021'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'Artemis Master Database',
        port: 3342  //update me
    }
};
var connection = new Connection(config);
connection.on('connect', function(err) {
  if(err){
    console.log(err,'rara')
  } else{
    // If no error, then good to proceed.
    console.log("Connected");
    // executeStatement();
  }
});


connection.connect();

module.exports = config;


var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

function executeStatement() {
  request = new Request("SELECT TOP(10)  CorrelationID FROM dbo.Applications", function(err){
    if(err){
      console.log(err,'logerr')
    }
  });
  var result = '';
  request.on('row', function(columns){
    columns.forEach(function(column) {
      if (column.value === null) {
        console.log('NULL');
      } else {
        result+= column.value + " ";
      }
    });
    console.log(result);
    result ="";
  })
  request.on('done', function(rowCount, more) {
    console.log(rowCount + ' rows returned');
    });

    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    connection.execSql(request);
}
module.exports = {
  executeStatement: executeStatement
}
