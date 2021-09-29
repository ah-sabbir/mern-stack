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
    userType:{
        type: String,
        required: true
    },
    members:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'members'
        }]
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;