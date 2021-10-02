const Member = require('../model/Member');
const User = require('../model/User');
const generator = require('generate-password');

module.exports = {
    async create(req, res){
        let {name, email, phone, authorId } = req.body;
        let password = generator.generate({
            length: 10,
            numbers: true
        });

        return await User.findById(authorId)
            .then(user=>{
                if(!user){
                    res.status(401).json({
                        message: 'no user found'
                    })
                }else{
                    let member = new Member({
                        name, email, phone, author: user._id, password
                    });
                    member.save()
                        .then(memberUser=>{
                            let updateUser = { ...user._doc };
                            
                            updateUser.members.unshift(memberUser._id);
                            User.findByIdAndUpdate(user._id, updateUser, function(err, docs ){
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log('user updated')
                                }
                            });
                            return res.status(201).json({
                                message: 'member created successfully',
                                memberUser
                            })
                        })
                        .catch(err=>{
                            return res.status(401).json({message:'server error'})
                        })
                }
            })
    },
    getAllMembers(req, res){
        let authId = req.params.authId
        console.log(authId)
        Member.find({author: authId })
                .then(members=>{
                    if(members.length === 0){
                        res.status(200).json({
                            message: 'no member found'
                        })
                    }else{
                        res.status(200).json(members);
                    }
                })
                .catch(error=>{
                    return res.status(400).json({
                        message:"Server error"
                    })
                })
    },
    async getSingleMemeber(req, res){
        let memberId  = req.params.uid;
        console.log(memberId);
        await Member.findById(memberId)
            .then(member=>{
                if(!member){
                    res.status(200).json({
                        message: 'No Member Found'
                    });
                }else{
                    res.status(200).json(member);
                }
            })
            .catch(error=>{
                return res.status(400).json({
                    message:"Server error"
                })
            })
    },
    async updateMember(req, res){
        try {
            const member = await Member.findById(req.params.uid);
            Object.assign(member,req.body);
            member.save();
            res.status(201).send({ data:member });
        } catch (error) {
            res.status(404).send({ error: "User Not Found !"});
        }
    },
    async deleteMember( req, res){
        try {
            const member = await Member.findById(req.params.uid);
            member.remove();
            res.status(201).send({ data:true });
        } catch (error) {
            res.status(404).send({ error: "User Not Found !"});
        }
    }
}