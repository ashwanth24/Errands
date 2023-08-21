const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//USER REGISTER
router.post("/register",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
            username:req.body.name,
            password:hashedPassword,
            email:req.body.email,
            phone:req.body.phone,
        });
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//USER LOGIN
router.post('/login',async(req,res)=>{
    try {
        let orginalPassword = req.body.password;
        const user = await User.findOne({email:req.body.email})
        if(user==null){
            res.json("user not found")
        }else{
        const validPassword = await bcrypt.compare(orginalPassword,user.password)
            if(!validPassword){
                res.json("wrong password")
            }
        }
        const accessToken = jwt.sign({
            id:user.id,
            isAdmin:user.isAdmin
        },process.env.JWT_KEY,{expiresIn:"7d"});
        const {password,...others}=user._doc;    
    res.json({...others,accessToken})
        
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})

//GET USER
router.get('/find/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL USER
router.get('/find',async(req,res)=>{
    try{    
        const user =query
        ?await User.find().sort({_id:-1}).limit(5)
        :await User.find();
       // console.log(user)
   // const{password ,...others} = user._doc;
    res.status(200).json(user)}
     catch (error) {
        res.status(500).json(error)
 
    }

})

router.delete("/:id",async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router
