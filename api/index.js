const express = require('express')
const app = express();

const mongoose = require('mongoose')
const  dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
//---------------------------------------------------------------------
const userRoute = require('./routes/user')
const sellerRoute = require('./routes/seller')
const productRoute = require('./routes/product')

//DB-connection--------------------------------------------------------
dotenv.config();
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("connected");
    //console.log(process.env.MONGO_URL)
});
//---------------------------------------------------------------------
mongoose.set('strictQuery', false);
app.use(morgan("common"))
app.use(express.json())
app.use(cors())

app.use('/api/user',userRoute)
app.use('/api/seller',sellerRoute)
app.use('/api/products',productRoute)


app.listen(5000,()=>{
    console.log("backend started")
})