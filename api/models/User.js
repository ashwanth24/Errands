const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    username:{
        type : String,
        required:true
    },
    email:{
        type: String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        reqiured:true,
        unique:true,
    },
    phone:{
        type:Number,
        reqiured:true,
        unique:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    img:{
        type:String,
    }


},{timestamps:true});

module.exports=mongoose.model("User",userSchema);