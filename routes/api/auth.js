const express = require('express');
var passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('azure_ad_oauth2'), (req, res) => res.send('Auth Route'));

module.exports = router;