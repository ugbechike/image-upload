var express = require('express');
// WE WILL CLREATE THIS ROUTE
var cloudiRouter = require('../imageRoutes'); 
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');


//  THIS WILL ALLOW US TO SET UP MIDDLEWARES TO RESPOND TO HTTP REQUEST.
var app = express();

// HERE WE WILL LET OUR APP TO GET ACCESS TO THE STATIC FOLDERS LIKE CSS, IMAGES
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// CONNECTING TO MONGOOSE DATABASE
mongoose.connect('mongodb://localhost/cloudinaryUpload', 
{
    useNewUrlParser: true
});
mongoose.connection;

// HANDLING CORS ERRORS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS'){
        res.headers('Access Controll-Allow-Mthods', 'POST, PUT, GET, DELETE');
        return res.status(200).json({})
    }
    
    next();
})

// THIS PART HANDLES THE ROUTING/URL
app.use('/uploads', cloudiRouter);

// THE WE HANDLE THE FINAL ERRORS


//HANDLE ERROR
app.use((req, res, next) => {
    const error = new Error('NOT FOUND')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


// DO NOT FORGET TO EXPORT THE FILE
module.exports = app
