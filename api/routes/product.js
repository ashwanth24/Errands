const router  = require("express").Router();
const {verifyToken,verifyTokenAndAthorization,verifyTokenAndAdmin}= require("./verifyToken")
const Product = require("../models/Product")
const Seller = require('../models/Seller')
const { findOne, findById } = require("../models/User");
//create
var ObjectId = require('mongodb').ObjectId;

const push=async(sellerId,{savedProduct})=>{

        let seller = await Seller.findByIdAndUpdate(sellerId,
            {$push:{products:savedProduct}},{new:true}  
              )
             // console.log(sellerId)
              // console.log(savedProduct)
              console.log(seller.products)

}
// Id is is of product where sellerId is inside product
// i want to remove the element(object) inside an array which is inside seller
const pop=async (Id)=>{
    let product = await Product.findById(Id)
    let sellerr = await Seller.findById(product.sellerId)
    let sellerProducts = sellerr.products
    let index = sellerProducts.indexOf(Id)
    await sellerProducts.splice(index,1)

    let seller = await Seller.findByIdAndUpdate(product.sellerId,  
        {$set:{products:sellerProducts}}
        )
}
router.post("/create",verifyTokenAndAdmin,async(req,res)=>{
    let search = req.body.title
    search = search.toLowerCase()
    console.log(search)
    const newProduct = new Product({
        title:req.body.title,
        decs:req.body.decs,
        img:req.body.img,
        categories:req.body.categories,
        price:req.body.price,
        size:req.body.size,
        color:req.body.color,
        sellerId:req.body.sellerId,
        searchTitle:search
    })
    let sellerId = req.body.sellerId
    
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
        //console.log(savedProduct)
       push(sellerId,{savedProduct})
    }catch(err){
       console.log(err)
        res.status(500).json(err)

    }
})

//update
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id
            ,{$set:req.body},{new:true})
            res.status(200).json("updated")
        
    }catch(err){
        res.status(500).json(err)
    }

})

//delete verifyTokenAndAdmin
router.delete("/delete/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        pop(req.params.id)
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("product deleted")
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

//get all user
//get all user
router.get("/",/*verifyTokenAndAdmin,*/async(req,res)=>{
    const qnew = req.query.new
    const qcategory = req.query.category
    try{
        
        let products;
        if(qnew){
            products = await Product.find().sort({createdAt:-1}).limit(2)}

        // }else if(qcategory){
        //     products = await Product.find({categories:{
        //         $in:[qcategory],
        //     }})

        else if(qcategory){

            products =  products= await Product.find()
           products = products.filter(m=>m.searchTitle.includes(qcategory))
           console.log(products)
            
        }else{
            products= await Product.find()
        }
    res.status(200).json({products})}
    catch(err){
        res.status(500).json(err)
    }
})


//get product
router.get("/find/:id",async(req,res)=>{
    try{const product = await Product.findById(req.params.id);
    
    res.status(200).json(product)
    console.log(product)
}
    catch(err){
        res.status(500).json(err)
    }
})

router.get('/cat/:cat',async(req,res)=>{
    try{    
        const cato = req.params.cat.toLowerCase()
         S = await Product.find({categories:{
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



module.exports = router