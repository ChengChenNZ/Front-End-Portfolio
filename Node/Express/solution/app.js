var express = require("express");
var app = express();
 
app.get("/",function*(req,res){
    res.send("Hi there, welcome to my assignment");
});

app.get("/speak/: animal", function(req,res){
     var sounds = {
         pig: "oink",
         cow: "Moo",
         dog: "Woof Woof",
         cat: "I hate you haman",
         goldfish: "..."
     }
     var animal = req.params.animal.toLowerCase();
     var sounds = sounds[animal];
     res.send("The" + animal + "says" + sounds + "");
}); 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Now serving your app!");
});