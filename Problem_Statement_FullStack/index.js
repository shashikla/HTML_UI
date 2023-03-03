
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/user", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const dataSchema = {
    name : String,
    email : String,
    password : String,
    number : Number,
};

const Data = mongoose.model("Data", dataSchema);
const app = express();

app.set("view engine", "ejs");
  
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.use(express.static(__dirname + '/views'));
  

app.post("index", function(req, res) {
    const data = new Data({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        number : req.body.number,
    });
    data.save(function(err) {
            if(err){
                throw err;
            } else {
                res.render("index");
            }
    });
});

app.get("/signup", function(req, res){
    res.render("index");
});

app.listen(3000, function(){
    console.log("app is running on Port 3000");
})

