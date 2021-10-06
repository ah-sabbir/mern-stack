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
    isAdmin:{
        type: Boolean,
        default: true

    },
    adminRef:{
            type: Schema.Types.ObjectId
    }
}, {timestamps: true} );


const User = mongoose.model('User', userSchema);

module.exports = User;