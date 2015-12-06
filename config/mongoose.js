var mongoose = require('mongoose');


module.exports = function(){
    var connString = 'mongodb://localhost:27017/SeeKforGeeK';
    if(process.env.NODE_ENV == 'production'){
        connString = 'mongodb://Valentin:123456789@ds047484.mongolab.com:47484/mongocloud';
    }
    mongoose.connect(connString);

    var db = mongoose.connection;


    db.once('open',function(err){
        if(err){
            console.log(err);
        }
        console.log('MongoDB database up and running...');
    });
    db.on('error', function(err){
        console.log(err);
    });


    var Geek = mongoose.model('Geek', {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        type: {type: String, required: true},
        num: Number
    });

    var Customer = mongoose.model('Customer', {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        type: {type: String, required: true},
        num: Number
    })
};