const exp=require("express");
const userApiObj=exp.Router();

const asyncHandler=require("express-async-handler")

//extract body of req obj
userApiObj.use(exp.json());

//import bcrypt
const bcryptjs=require("bcryptjs");

const jwt=require("jsonwebtoken")

//post req handler for user register
userApiObj.post("/registration", asyncHandler(async(req,res,next)=>{
    //console.log("the user is ",req.body)
    //get user collection object
    let userCollectionObj = req.app.get("userCollectionObj");
    
    
    //let userObj =  JSON.parse(req.body.userObj)
    let userObj = req.body;
    //console.log("user object is",userObj);
    //check for user in db
    let user = await userCollectionObj.findOne({username:userObj.username});

    //if username alreaddy taken
    if(user!==null){
        res.send({message:"user existed"});
    }
    else{
        //console.log("user not there")
        //hash the password
        let hashedpwd = await bcryptjs.hash(userObj.password,6);

        //replace plain txt pswdd with hashed pswd
        userObj.password = hashedpwd;

        //create user
        let success=await userCollectionObj.insertOne(userObj);
        res.send({message:"user created"})
        console.log("user created")
        
        
    }
   //console.log("user obj is",req.body);
}))

//user login
userApiObj.post("/login",asyncHandler(async(req,res,next)=>{
    //get user collectionObject
    let userCollectionObj = req.app.get("userCollectionObj");

    let userCredObj = req.body;
    //verify  username
    let user = await userCollectionObj.findOne({username:userCredObj.username})

    if(user == null){
        res.send({message:"Invalid username"})
    }
    else{
        //verify password
        let status = await bcryptjs.compare(userCredObj.password,user.password);

        //if pswd matched
        if(status == true){
            //create a token
            let token = await jwt.sign({username:user.username},"abcd",{expiresIn:10});

            //send token
            res.send({message:"success",signedToken:token,username:user.username});
        }
        else{
            res.send({message:"Invalid password"});
        }
    }
}))

userApiObj.post("/addtocart",asyncHandler(async(req,res,next)=>{

    //console.log("the cart obj is ",req.body)
    let cardCollectionObj= req.app.get("cardCollectionObj");

    let cartObj=req.body;

    await cardCollectionObj.insertOne(cartObj);
    res.send({message:true})

    
}))

userApiObj.post("/viewitem",asyncHandler(async(req,res,next)=>{
    let cardCollectionObj=req.app.get("cardCollectionObj");
    //console.log("In ViewItem ",req.body)
    let Obj=req.body;
    let viewItem=await cardCollectionObj.findOne({productname:Obj.productname});
    if(viewItem!==null){
        //create a token
        let token = await jwt.sign({productname:viewItem.productname},"abcd",{expiresIn:10});

        //send token
        res.send({message:true,signedToken:token,productname:viewItem.productname});
    }
    
}))

//get all products
userApiObj.get("/getcartitems/:username",asyncHandler(async(req,res,next)=>{

    let cardCollectionObj = req.app.get("cardCollectionObj");
    
    let products = await cardCollectionObj.find({username:req.params.username}).toArray();
    res.send({message:products})
    //console.log(products)
}))

userApiObj.post("/deleteproduct",asyncHandler(async(req,res,next)=>{
    
    let cardCollectionObj = req.app.get("cardCollectionObj");
    let cartObj =  req.body;
    
    //console.log("user object is",cartObj);
    //check for user in db
    let product = await cardCollectionObj.findOne({productname:cartObj.productname});

    //product is there
    if(product!==null){
        let remove=await cardCollectionObj.deleteOne({productname:cartObj.productname});
        res.send({message:true});
    }

}))



//export
module.exports = userApiObj;