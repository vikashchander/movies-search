const  express = require("express"),
      request = require("request"),
       rp = require('request-promise');
     // promise = require("bluebird"),
      app = express();
 
      app.set("view engine","ejs");
     
    
      app.get('/',(req,res)=>{
        rp('https://jsonplaceholder.typicode.com/users')
        .then((body)=>{
            const parseData = JSON.parse(body);
            console.log("parse data is",parseData);
            res.status(200).render("show", {data: parseData});
        })
        .catch((err)=>{
            console.log("error is ",err);
        })
          
      });

      app.listen(process.env.PORT || 1234,(err)=>{
          if(!err){
              console.log("server is started ");
          }
      })
