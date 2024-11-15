//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();

var DB = require("nedb-promises"); 
var Profolio = DB.create(__dirname+"/profolio.db");  
Profolio.insert({modal: "#portfolioModal1", imgSrc:"roundicons.png", heading:"Round Icons", text:"Graphic Design"})

//web root
server.use(express.static(__dirname+"/AgencyProject"));

server.get("/profolio", (req,res)=>{
    Services:[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ]
    res.send("Profolio")
    })

server.listen(80, ()=>{
    console.log("Server is running at port 80.");
})