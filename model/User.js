const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String,
    },
    members:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;