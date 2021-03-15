var mongoose = require('mongoose');

const HistoryStoreSchema = new mongoose.Schema({
    device_id: { type: String },
    institution_id: { type: String },
    category: { type: String },
    type: { type: String },
    manufacturer: { type: String },
    model: { type: String },
    serialNumber: { type: String },
    licenseKey: { type: String },
    licenseExpiry: { type: String },
    firmwareVersion: { type: String },
    applicationVersion: { type: String },
    statusDateTime: { type: String },
    status: { type: String },
    errorText: { type: String },
    lat: { type: String },
    lng: { type: String }
});

module.exports = HistoryStore = mongoose.model('HistoryStore', HistoryStoreSchema);