const express = require('express');
var passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('azure_ad_oauth2'));

router.get('/callback', passport.authenticate('azure_ad_oauth2',
    {
        successRedirect: '/api/dashbord',
        failureRedirect: '/'
    }),
    function (req, res) {
    });

module.exports = router;