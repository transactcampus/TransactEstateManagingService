const express = require('express');
const router = express.Router();
const DeviceInfo = require('../../models/DeviceInfo');

//@route GET api/dashboard
//@desc Get the dashboard of the IoT devices
//@access private
router.get('/', (req, res) => {
    res.send("Welcome to the Dashboard!!")
});

//@route GET api/dashboard/deviceprofiles
//@desc Get all the recent status of the devices
//@access private
//GET api/dashboard/deviceprofiles?limit=10&skip=10
router.get('/deviceprofiles', async (req, res) => {
    try {
        const deviceprofiles = await DeviceInfo.find();
        //code and discard
        //printing the device profiles
        //console.log(deviceprofiles);
        //checking the user id
        //console.log(req.user.id);

        res.json(deviceprofiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/dashboard/deviceprofiles/onlinecount
//@desc Get the total number of online devices
//@access private
router.get('/deviceprofiles/onlinecount', async (req, res) => {
    try {
        // await DeviceInfo.countDocuments({ status: 'online' }, function (err, c) {
        //     res.json({ onlineDevices: "c" });
        // });
        const count = await DeviceInfo.countDocuments({ status: 'online' });
        res.json(count);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/dashboard/deviceprofiles/offlinecount
//@desc Get the total number of offline devices
//@access private
router.get('/deviceprofiles/offlinecount', async (req, res) => {
    try {
        // await DeviceInfo.countDocuments({ status: 'online' }, function (err, c) {
        //     res.json({ onlineDevices: "c" });
        // });
        const count = await DeviceInfo.countDocuments({ status: 'offline' });
        res.json(count);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/dashboard/deviceprofiles/:status
//@desc Get devices by their recent status
//@access private
router.get('/deviceprofiles/:status', async (req, res) => {
    try {
        const deviceprofiles = await DeviceInfo.find({ status: req.params.status });

        if (!deviceprofiles) {
            return res.status(400).json({ msg: 'Device Profile with that status not found' });
        }

        res.json(deviceprofiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/dashboard/deviceprofiles/devices/:device_id
//@desc Get device profile by device ID
//@access private
router.get('/deviceprofiles/devices/:device_id', async (req, res) => {
    try {
        const deviceprofile = await DeviceInfo.findOne({ device_id: req.params.device_id });

        if (!deviceprofile) {
            return res.status(404).json({ msg: 'Device id not found.' });
        }

        res.json(deviceprofile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/dashboard/deviceprofiles/:institution_id
//@desc Get device profile by institution id
//@access private
router.get('/deviceprofiles/institutions/:institution_id', async (req, res) => {
    try {
        const deviceprofiles = await DeviceInfo.find({ institution_id: req.params.institution_id });

        if (!deviceprofiles) {
            return res.status(400).json({ msg: 'Institution id not found.' });
        }

        res.json(deviceprofiles);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;