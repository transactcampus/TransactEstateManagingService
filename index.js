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
}, function (accessToken, refresh_token, params, profile, done) {
    // var user = jwt.decode(params.id_token, "", true);
    // User.findOne({ username: user }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    // });

    var waadProfile = profile || jwt.decode(params.id_token, '', true);
    console.log(waadProfile);
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
app.get('/', (req, res) => res.send('Route is working'));

app.use('/api/auth', require('./routes/api/auth'));

app.get('/api/auth/callback', passport.authenticate('azure_ad_oauth2',
    {

        failureRedirect: '/'
    }),
    function (req, res) {
        console.log("failed");
        res.send("Callback route");
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));