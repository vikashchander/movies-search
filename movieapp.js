const express = require("express"),
      passport =require("passport"),
      auth = require("./utils/oauth"),
      request = require("request"),
      bodyParser = require("body-parser"),
      rp      = require("request-promise"),
      app     = express();

      app.set("view engine","ejs");
      app.use(bodyParser.urlencoded({extended:false}));
      app.use(bodyParser.json());
      
      app.use(passport.initialize());
      app.use(passport.session());
      app.get('/auth/google',
      passport.authenticate('google', { scope: 
      [ 'https://www.googleapis.com/auth/plus.login',
      , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));
      app.get("/",(req,res)=>{
          res.render("search");
      });
      app.get("/login",(req,res)=>{
          res.render("login");
      })

      app.get("/results",(req,res)=>{
        let query = req.query.search;
        let url   = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`;
        rp(url)
        .then((body)=>{
            var data = JSON.parse(body);
            res.status(200).render("moviesresults",{data:data})
        })
        .catch((err)=>{
            console.log("error is ",err);
        });
        // request(url,(err,response,body)=>{
        //     if(!err && response.statusCode==200){
        //     var data = JSON.parse(body);
        //      res.render("moviesresults",{data:data});
        //     }
       // });
      
    });
    app.get("/details",(req,res)=>{
       // let query = req.query.search;
        let url   = `http://www.omdbapi.com/?t=naruto&apikey=thewdb`;
        rp(url)
        .then((body)=>{
            var data = JSON.parse(body);
            console.log("data in details",data);
            res.status(200).render("moviesdetails",{data:data});
        })
        .catch((err)=>{
            console.log("error is ",err);

        });
    });

      app.listen(process.env.PORT ||3333,(err)=>{
          if(!err){
              console.log("Movies App Server start");
          };
      });