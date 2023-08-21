const router  = require("express").Router();
const {verifyToken,verifyTokenAndAthorization,verifyTokenAndAdmin}= require("./verifyToken")
const Cart = require("../models/Cart")


//create
router.post("/create",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        console.log(err)
        res.status(500).json(err)

    }
})



//update
router.put("/:id",verifyTokenAndAthorization,async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id
            ,{$set:req.body},{new:true})
            res.status(200).json("updated")
        
    }catch(err){
        res.status(500).json(err)
    }

})



//delete verifyTokenAndAdmin
router.delete("/:id",verifyTokenAndAthorization,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("product deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

//get product
router.get("/:userId",verifyTokenAndAthorization,async(req,res)=>{
    try{const cart = await Cart.findOne({userId:req.params.id});
    
    res.status(200).json(product)}
    catch(err){
        res.status(500).json(err)
    }
})

//get all cart product
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const cart = await Cart.find()
    res.status(200).json(cart)}
    catch(err){
        res.status(500).json(err)
    }
})





module.exports = router