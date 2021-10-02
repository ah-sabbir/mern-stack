const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
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
        type: String
    },
    phone:{
        type: String,
        required: true,
        trim: true
    },
    user:{
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
}, { timestamps: true } );


const Member = mongoose.model('Member', memberSchema);

module.exports = Member;