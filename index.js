// check the file work or not 
// express code 
const express = require("express");
require('./db/config');
const User = require("./db/User");
const Product =require("./db/Product"); 
const cors = require("cors");
//const mongoose =require("mongoose");
const app = express();
// JWT TOKON IMPORT
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';



// API for signup and resgister users
app.use(express.json());
app.use(cors());
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})
// API for login user 

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

// API for add new product 
app.post("/add-product",async(req,resp)=>{
    let product = new Product(req.body);
    let result= await product.save();
    resp.send(result)
})

// for list the product added in application 

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

// API for Delete  product 
app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    
    resp.send(result)
    
});

//api for single update product

app.get("/product/:id", async (req, resp) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})


// Api for update the product 

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});
// Api for search 
app.get("/search/:key",verifyToken ,async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                company: { $regex: req.params.key }
            },
            {
                category: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
});

function verifyToken(req,resp,next){
    let token =req.headers['authorization'];
    if(token){
        token =token.split(' ');
    }else{

    }
    console.log("middleware",token);
    next();
}

app.listen(5000)
