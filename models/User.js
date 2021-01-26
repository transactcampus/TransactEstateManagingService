var mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    email: {
        type: String,
        //required: true,
        //unique: true
    }
});


UserSchema.plugin(findOrCreate)

module.exports = User = mongoose.model('user', UserSchema);