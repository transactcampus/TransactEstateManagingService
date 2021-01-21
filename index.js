//calling the express function from the express library
var express = require('express');
var mongoose = require("mongoose");
var env = require('dotenv').config();
var passport = require('passport');
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2');
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

app.use(parser.urlencoded({ extended: true }));

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
    clientID: '0c09e3c1-b11d-40ab-9119-d87fb3e87cdc',
    clientSecret: '8312546a-f9e7-4c5e-9b7b-f764d992d2bf',
    callbackURL: 'https://localhost:5000',
    resource: '00000002-0000-0000-c000-000000000000',
    tenant: 'contoso.onmicrosoft.com',
    useCommonEndpoint: 'https://login.windows.net/common'
},
    function (accessToken, refresh_token, params, profile, done) {
        var waadProfile = profile || jwt.decode(params.id_token, '', true);

        User.findOrCreate({ id: waadProfile.upn }, function (err, user) {
            done(err, user);
        });
    }));

app.get('/', (req, res) => res.send('Route is working'));

app.get('/auth/azureadoauth2',
    passport.authenticate('azure_ad_oauth2'));

app.get('/auth/azureadoauth2/callback',
    passport.authenticate('azure_ad_oauth2', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

//Define Routes here
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));