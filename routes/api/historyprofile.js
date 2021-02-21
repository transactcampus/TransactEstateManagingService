const express = require('express');
const router = express.Router();
const HistoryStore = require('../../models/HistoryStore');
const paginatedData = require('../../middleware/paginatedData');
const paginatedInfo = require('../../middleware/paginatedInfo');

//@route GET api/history
//@desc Get the history of all the devices
//@route GET api/history?page=1&limit=2
//@access private
router.get('/', paginatedData(HistoryStore), async (req, res) => {
    res.json(res.paginatedResult);
});

//@route GET api/history/device_id
//@desc Get the history by the device
//@access private
router.get('/:device_id', paginatedInfo, async (req, res) => {
    try {
        const devicehistory = await HistoryStore.find({ device_id: req.params.device_id }).limit(req.limit).skip(req.startIndex);

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