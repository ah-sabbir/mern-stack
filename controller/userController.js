const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwtDecode = require('jwt-decode');

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
                            phone: user.phone,
                            role: user.role
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
        let { name, email, password, confirmPassword, phone } = req.body;
        const validate = registerValidator({
            name,
            email,
            password,
            confirmPassword,
            phone
        });

        if(!validate.isValid){
            return res.status(400).json(validate.errors);
        }else{
            
            return User.findOne({email})
                .then(user =>{
                    if(user){
                        return res.status(400).json({
                            message: "User already exist."
                        });
                    }else{
                        bcrypt.hash(password, 11, (err, hash)=>{
                            if(err){
                                return res.status(500).json({
                                    message: "Server Error Occurred"
                                })
                            }

                            let decode = {}
                            let isAdmin = true
                            let adminRef = null
                            if(req.headers.authorization){
                                decode = jwtDecode(req.headers.authorization)
                                isAdmin = false
                                adminRef = decode._id
                            }

                            let user = new User({
                                name,
                                email,
                                password: hash,
                                phone,
                                isAdmin: isAdmin,
                                adminRef: adminRef
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
                    }
                })
                .catch(error =>{
                    return res.status(500).json({
                        error,
                        message: 'Server Error'
                    });
                });
        }
    },
    async profile(req, res){
        const uid = req.params.uid;
        return await User.findOne({_id:uid})
                    .then(user=>{
                        if(!user){
                            return res.status(400).json({
                                message:"user not found"
                            })
                        }
                        if(user.isAdmin){
                            User.find({adminRef: user._id},function(err,users){
                                if(err){
                                    console.log(err)
                                    res.send('server error')
                                }
                                user._doc.users = [...users]
                                const response = user._doc

                                res.status(200).json(response)
                            })
                        }else{
                            const {_id, name,email,phone} = user;
                            return res.status(200).json({_id, name,email,phone})
                        }
                                // .then(users=>console.log(users)
                            // const {name, email, phone} = user;
                        })
                        
                    //     console.log(users);
                    //     // return res.status(201).json(user);
                    //     return res.status(201).json({name,email,phone});
                    // })
                    .catch(err=>{
                        console.log(err)
                        return res.status(500).json({
                            message:"Server error"
                        })
                    })
    },
    async updateUser(req, res){
        try {
            const user = await User.findById(req.params.uid);
            Object.assign(user,req.body);
            user.save();
            res.status(201).send({ data:user });
        } catch (error) {
            res.status(404).send({ error: "User Not Found !"});
        }
    },
    async deleteUser(req, res){
        try {
            const user = await User.findById(req.params.uid);
            user.remove();
            res.status(201).send({ data:true });
        } catch (error) {
            res.status(404).send({ error: "User Not Found !"});
        }
    },


}