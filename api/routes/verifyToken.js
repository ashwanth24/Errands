const jwt = require("jsonwebtoken")
const { token } = require("morgan")
const User = require("../models/User")



const verifyToken=(req,res,next)=>{
    const authheader = req.headers.token
    if(authheader){
        const token = authheader.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY, (err,user)=>{
            if(err)res.status(403).json("invalid token");
            
            req.user=user;
            //console.log(req.user)
            next();
        })
    }else{
        res.status(401).json("no auth")
    }
};

const verifyTokenAndAthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id==req.params.id ||req.user.isAdmin){
            next();
        }else{
            res.status(403).json("you are not allowed")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("you are not allowed")
        }
    })
}


module.exports = {verifyToken,verifyTokenAndAthorization,verifyTokenAndAdmin};