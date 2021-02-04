const express = require('express');
const router = express.Router();
const DeviceInfo = require('../../models/DeviceInfo');

router.get('/', async (req, res) => {
    try {
        const deviceprofiles = await DeviceInfo.find();
        //printing the device profiles
        console.log(deviceprofiles);
        //checking the user id
        console.log(req.user.id);

        res.json(deviceprofiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;