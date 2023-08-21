const router = require('express').Router();
const Seller = require('../models/Seller')
const Product = require('../models/Product')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { find } = require('../models/User');

//USER REGISTER
router.post("/seller-register",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        const newUser = new Seller({
            username:req.body.name,
            shop:req.body.shopname,
            password:hashedPassword,
            email:req.body.email,
            phone:req.body.phone,
            image:req.body.image
        });
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//AdminUser LOGIN
router.post('/seller-login',async(req,res)=>{
    try {
        let orginalPassword = req.body.password;
        const user = await Seller.findOne({email:req.body.email})
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
    res.status(200).json({...others,accessToken})
        
    } catch (error) {
        res.json(error)
        console.log(error)
    }
})

//GET USER
router.get('/seller-find/:id',async(req,res)=>{
    try {
        const user = await Seller.findById(req.params.id)
        const {password,...others} = user._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL USER
router.get('/seller-find',async(req,res)=>{
    try{    
        const seller = await Seller.find()
       // console.log(user)
   // const{password ,...others} = user._doc;
    res.status(200).json(seller)}
     catch (error) {
        res.status(500).json(error)
        console.log(error)
 
    }

})
router.get('/seller-cat/:cat',async(req,res)=>{
    try{    
        const cato = req.params.cat.toLowerCase()
         S = await Seller.find({storeType:{
                        $in:[cato],
                    }})

       // console.log(user)
   // const{password ,...others} = user._doc;
    res.status(200).json(S)}
     catch (error) {
        res.status(500).json(error)
        console.log(error)
 
    }

})

//.filter({categories:{$in:["oneplus"]}})

router.delete("/seller/:id",async(req,res)=>{
    try{
        await Seller.findByIdAndDelete(req.params.id)
        res.status(200).json("user deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router
