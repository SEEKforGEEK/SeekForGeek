var express = require("express"),
    bodyParser = require("body-parser");

    require('./config/mongoose')();


var app = express();
var id = 0;
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.sendfile("public/index.html");
});

app.post('/login', function(req, res){
    var username = req.body.user;
    var password = req.body.password;

    console.log("From client post request : username " + username + " password  " + password);

    id++;
    res.json({
        id: id
        //type: type
    });
    res.end("yes");
});

app.post('/register', function(req, res){
    var username = req.body.user;
    var password = req.body.password;
    var email = req.body.email;
    var type = req.body.type;

    console.log("From client post request : username " + username + " password  " + password +
        "  email : " + email + " type: " + type);

    id++;
    res.json({
        id: id,
        type: type
    });
    res.end("yes");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 7777");
});