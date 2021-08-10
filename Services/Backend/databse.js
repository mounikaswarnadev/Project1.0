var Connection = require('tedious').Connection;  
    var config = {  
        server: 'tcp:inventory.public.ec670bc17eaf.database.windows.net',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'RajeshD', //update me
                password: 'ArtemisRajesh2021',  //update me
                
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'Artemis Master Database'  //update me
        }
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        if(err){
            console.log(err,'err');
        } else{
        // If no error, then good to proceed.
        console.log("Connected");  
        }
    });
    
    connection.connect();
module.exports = config;
