const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    searchTitle:{
        type:String
    },
    img:[{
        type:String,
        required:true,
        
    }],
    decs:{
        type:String,
        required:true, 
            
     },
    categories:{
        type:Array
    },
    size:[{
        type:Array,
    },],
    color:{
        type:Array,
    },
    price:{
        type:Number,
        required:true,
       
    },
    inStock:{
        type:Boolean,
        default:true
    },
    sellerId:{
        type: String,
    },
    stockCount:{
        type:Number
    },
    review:[
       { comment:{type:String},
        rating:{type:Number}},
       
    
    ]


},{timestamps:true});

module.exports = mongoose.model("Product",productSchema)