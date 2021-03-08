const express = require('express');
var passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('azure_ad_oauth2'));

router.get('/callback', passport.authenticate('azure_ad_oauth2',
    {
        successRedirect: '/dashboard',
        failureRedirect: '/'
    }),
    function (req, res) {
    });

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect("/");
});

module.exports = router;