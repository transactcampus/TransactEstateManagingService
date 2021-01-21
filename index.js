//calling the express function from the express library
var express = require('express');

var mongoose = require("mongoose");
var env = require('dotenv').config();

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

app.get('/', (req, res) => res.send('Route is working'));

//Define Routes here
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));