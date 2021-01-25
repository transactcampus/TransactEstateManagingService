//calling the express function from the express library
var express = require('express');
var mongoose = require("mongoose");
var env = require('dotenv').config();
var passport = require('passport');
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
var parser = require('body-parser');

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

//code and discard to test the cosmosDB
// const Family = mongoose.model('Family', new mongoose.Schema({
//     lastName: String,
//     parents: [{
//         familyName: String,
//         firstName: String,
//         gender: String
//     }],
//     children: [{
//         familyName: String,
//         firstName: String,
//         gender: String,
//         grade: Number
//     }],
//     pets: [{
//         givenName: String
//     }],
//     address: {
//         country: String,
//         state: String,
//         city: String
//     }
// }));

// const family = new Family({
//     lastName: "Volum",
//     parents: [
//         { firstName: "Thomas" },
//         { firstName: "Mary Kay" }
//     ],
//     children: [
//         { firstName: "Mike", gender: "male", grade: 8 },
//         { firstName: "Patrick", gender: "male", grade: 7 }
//     ],
//     pets: [
//         { givenName: "Buddy" }
//     ],
//     address: { country: "USA", state: "WA", city: "Seattle" }
// });

// family.save((err, saveFamily) => {
//     console.log(JSON.stringify(saveFamily));
// });

passport.use(new AzureAdOAuth2Strategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'http://localhost:5000/api/auth/callback',
}, (accessToken, refresh_token, params, profile, done) => {
    console.log(accessToken);
    console.log('refreshtoken', refresh_token);
    console.log('Profile', profile);
}));

// app.get('/',
//     passport.authenticate('azure_ad_oauth2'));

// passport.use(new OIDCStrategy({
//     identityMetadata: process.env.identityMetadata,
//     clientID: process.env.clientID,
//     responseType: process.env.responseType,
//     responseMode: process.env.responseMode,
//     redirectUrl: process.env.redirectUrl,
//     clientSecret: process.env.clientSecret,
// },
//     function (iss, sub, profile, accessToken, refreshToken, done) {
//         if (!profile.oid) {
//             return done(new Error("No oid found"), null);
//         }
//         // asynchronous verification, for effect...
//         process.nextTick(function () {
//             findByOid(profile.oid, function (err, user) {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!user) {
//                     // "Auto-registration"
//                     users.push(profile);
//                     return done(null, profile);
//                 }
//                 return done(null, user);
//             });
//         });
//     }
// ));
//Define Routes here
app.get('/', (req, res) => res.send('Route is working'));

app.use('/api/auth', require('./routes/api/auth'));

app.get('/api/auth/callback',
    passport.authenticate('azure_ad_oauth2'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));