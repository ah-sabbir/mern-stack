const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./route/userRoute')

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);






app.get('/', (req,res)=>{
    res.json({
        "message":"welcome to our site"
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("server is running on port 4000");
    mongoose.connect('mongodb://localhost/mernstack',
    {useNewUrlParser:true},
     ()=>{
        console.log("database connected...");
    });
});