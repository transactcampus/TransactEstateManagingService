const express = require('express');
const router = express.Router();
const HistoryStore = require('../../models/HistoryStore');

//@route GET api/history
//@desc Get the history of all the devices
//@access private
router.get('/', async (req, res) => {
    try {
        const history = await HistoryStore.find();

        res.json(history);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/history/device_id
//@desc Get the history by the device
//@access private
router.get('/:device_id', async (req, res) => {
    try {
        const devicehistory = await HistoryStore.find({ device_id: req.params.device_id });

        if (!devicehistory) {
            return res.status(400).json({ msg: 'History of the device could not be found.' });
        }

        res.json(devicehistory);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;