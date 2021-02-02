//calling the express function from the express library
var express = require('express');
var env = require('dotenv').config();
var passport = require('passport');
var AzureAdOAuth2Strategy = require('passport-azure-ad-oauth2').Strategy;
var parser = require('body-parser');
var jwt = require('jsonwebtoken');
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");

// <CreateClientObjectDatabaseContainer>
const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

async function createDB() {
    // Make sure Tasks database is already setup. If not, create it.
    await dbContext.create(client, databaseId, containerId);
    // </CreateClientObjectDatabaseContainer>

    console.log("Connection to CosmosDB is successful.\r\n");

}

createDB();

async function createUser(given_name, family_name, email) {
    const newUser = {
        given_name: given_name,
        family_name: family_name,
        email: email,
    };

    try {
        const querySpec = {
            query: "SELECT c.email from c"
        };

        const { resources: users } = await container.items.query(querySpec).fetchAll();

        users.forEach(user => {
            if (user.email == email) {
                //console.log(user)
                return user;

            }
        });
        const { resource: createdUser } = await container.items.create(newUser);

        console.log(`\r\nCreated new User: ${createdUser.email} - ${createdUser.given_name}\r\n`);
    } catch (err) {
        console.log(err.message);
    }
}

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
    addUser(waadProfile.email);
    createUser(waadProfile.given_name, waadProfile.family_name, waadProfile.email);

    // User.findOrCreate({ given_name: waadProfile.given_name, family_name: waadProfile.family_name, email: waadProfile.email }, function (err, user) {
    //const { id, given_name } = createdUser;
    done(null, true);
    // });
}));
passport.serializeUser(function (newUser, done) {
    done(null, newUser.given_name);
});

passport.deserializeUser(function (createdUser, done) {
    const { id, given_name } = createdUser;
    //console.log(createdUser)
    // User.findById(id, function (err, user) {
    done(null, createdUser);
    // });
});

//Define Routes here
app.get('/api/dashbord', (req, res) => res.send("Welcome to the dashboard!"));

app.get('/', (req, res) => res.send('Route is working'));

app.use('/api/auth', require('./routes/api/auth'));

app.get('/api/auth/callback', passport.authenticate('azure_ad_oauth2',
    {
        successRedirect: '/api/dashbord',
        failureRedirect: '/'
    }),
    function (req, res) {
    });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));