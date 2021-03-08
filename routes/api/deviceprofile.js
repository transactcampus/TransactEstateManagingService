const express = require('express');
const router = express.Router();
const DeviceInfo = require('../../models/DeviceInfo');
const paginatedData = require('../../middleware/paginatedData');
const paginatedInfo = require('../../middleware/paginatedInfo');

//@route GET api/dashboard
//@desc Get the dashboard of the IoT devices
//@access private
// router.get('/', (req, res) => {
//     res.send("Welcome to the Dashboard!!")
// });

//@route GET api/dashboard/deviceprofiles?page=1&limit=5
//@desc Get all the recent status of the devices
//@access private
router.get('/', paginatedInfo, async (req, res) => {

    try {
        const deviceprofiles = await DeviceInfo.find().select('-_id').limit(req.limit).skip(req.startIndex);
        if (!deviceprofiles) {
            return res.status(400).json({});
        }
        res.json(deviceprofiles);
    } catch (error) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

    //code&discard
    //helpful for frontend team to understand the data
    //console.log(res.paginatedResult.result[0].device_id);
});

//@route GET api/dashboard/deviceprofiles/onlinecount
//@desc Get the total number of online devices
//@access private
router.get('/onlinecount', async (req, res) => {
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
router.get('/offlinecount', async (req, res) => {
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
//@route GET api/dashboard/deviceprofiles/:status?page=1&limit=10
//@desc Get devices by their recent status
//@access private
router.get('/:status', paginatedInfo, async (req, res) => {
    try {
        // const page = parseInt(req.query.page);

        // const limit = parseInt(req.query.limit);

        // const startIndex = (page - 1) * limit;

        // const endIndex = page * limit;
        //code&discard
        console.log(req.limit);

        const deviceprofiles = await DeviceInfo.find({ status: req.params.status }).select('-_id').limit(req.limit).skip(req.startIndex);

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
router.get('/devices/:device_id', async (req, res) => {
    try {
        const deviceprofile = await DeviceInfo.findOne({ device_id: req.params.device_id }).select('-_id');

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
//@route GET api/dashboard/deviceprofiles/:institution_id?page=1&limit=2
//@desc Get device profile by institution id
//@access private
router.get('/institutions/:institution_id', paginatedInfo, async (req, res) => {
    try {
        const deviceprofiles = await DeviceInfo.find({ institution_id: req.params.institution_id }).select('_id').limit(req.limit).skip(req.startIndex);

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