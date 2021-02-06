//calling the express function from the express library
var express = require('express');
var mongoose = require("mongoose");
var env = require('dotenv').config();
var passport = require('passport');
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
var parser = require('body-parser');
var jwt = require('jsonwebtoken');
const User = require('./models/User');
const findOrCreate = require('mongoose-find-or-create')

//Connection to the cosmos DB 
mongoose.connect("mongodb://" + process.env.COSMOSDB_HOST + ":" + process.env.COSMOSDB_PORT + "/" + process.env.COSMOSDB_DBNAME + "?ssl=true&replicaSet=globaldb", {
    auth: {
        user: process.env.COSMOSDB_USER,
        password: process.env.COSMOSDB_PASSWORD
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false
}).then(() => console.log('Connection to CosmosDB successful')).catch((err) => console.error(err));

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));


app.use(require("cookie-session")({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new AzureAdOAuth2Strategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'http://localhost:5000/api/auth/callback',
}, (accessToken, refresh_token, params, profile, done) => {
    var waadProfile = jwt.decode(params.id_token, '', true);
    //printing the user logged in profile
    console.log(params);
    User.findOrCreate({ given_name: waadProfile.given_name, family_name: waadProfile.family_name, email: waadProfile.email }, function (err, user) {

        done(err, user);
    });
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//Define Routes here

//test route
app.get('/', (req, res) => res.send('Route is working'));

//Authentication and Authorization Route
app.use('/api/auth', require('./routes/api/auth'));

/* This route takes the user to the dashboard page */
app.use('/api/dashbord', require('./routes/api/deviceprofile'));

//history routes
app.use('/api/history', require('./routes/api/historyprofile'));

//Code and Discard
// app.get('/api/auth/callback', passport.authenticate('azure_ad_oauth2',
//     {
//         successRedirect: '/api/dashbord',
//         failureRedirect: '/'
//     }),
//     function (req, res) {
//     });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));