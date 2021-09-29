const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcrypt');


module.exports = {
    login(req, res){
        const {email,password} = req.body;
        const validator = loginValidator({email, password});
        if(!validator.isValid){
            return res.status(400).json(validator.errors);
        }

        return User.findOne({email})
            .then(user =>{
                if(!user){
                    return res.status(400).json({
                        message: "User not found."
                    });
                } else{
                    bcrypt.compare(password, user.password, (error, result)=>{
                        if(error){
                            return res.status(500).json({message:"Server error"});
                        } 
                        
                        if(!result){
                            return res.status(400).json({message:"Password Doesn\'t match."});
                        }

                        let token = jwt.sign({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone
                        }, 'SECRET', {expiresIn: '2h'});

                        return res.status(200).json({
                            message: 'Login Successfully',
                            token: `Bearer ${token}`
                        })
                    });
                }
            })
            .catch(error =>{
                return res.status(500).json({
                    message: "Server Error"
                })
            });
    },
    register(req, res){
        let {name, email, password, confirmPassword, phone, userType } = req.body;
        const validate = registerValidator({
            name,
            email,
            password,
            confirmPassword,
            phone,
            userType
        });

        if(!validate.isValid){
            return res.status(400).json(validate.errors);
        }else{
            User.findOne({email})
                .then(user =>{
                    if(user){
                        return res.status(400).json({
                            message: "User already exist."
                        });
                    }


                    bcrypt.hash(password, 11, (err, hash)=>{
                        if(err){
                            return res.status(500).json({
                                message: "Server Error Occurred"
                            })
                        }

                        let user = new User({
                            name,
                            email,
                            password: hash,
                            phone,
                            userType
                        });

                        user.save()
                            .then(user=>{
                                return res.status(201).json({
                                    message: 'Created successfully',
                                    user
                                })
                            })
                            .catch(error => {
                                return res.status(500).json({
                                    message: "Server Error"
                                })
                            })
                        // res.json(user)
                    });
                })
                .catch(error =>{
                    return res.status(500).json({
                        error,
                        message: 'Server Error'
                    })
                });
        }
    }

}