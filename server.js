const exp=require("express")
const app=exp();

const mc=require("mongodb").MongoClient;

//import .env file
require("dotenv").config();

const path=require("path")

//connect angular with web server
app.use(exp.static(path.join(__dirname,"dist/E-Commerce")));

//import api objects
const userApiObj=require("./APIS/userApi")
const adminApiObj=require("./APIS/adminApi");

//forward req obj to specific API based on path
app.use("/user",userApiObj)
app.use("/admin",adminApiObj)

//dburl
const dburl=process.env.dburl;

//db connectivity
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{

    //get database object
    const databaseObj=client.db("MyAppDatabase");
    const userCollectionObj=databaseObj.collection("usercollection");
    const cardCollectionObj=databaseObj.collection("cardcollection")
    const productCollectionObj=databaseObj.collection("productcollection")

    //sharing collection object
    app.set("userCollectionObj",userCollectionObj)
    app.set("cardCollectionObj",cardCollectionObj)
    app.set("productCollectionObj",productCollectionObj)
    console.log("DB Server Started")
})
.catch(err=>console.log("err in db connection",err))



//middleware to handle invalid paths
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid path`})
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"error occured",reason:err.message})
})

//assign port number
const port=process.env.port||8080;
app.listen(port,()=>console.log(`Web server is on ${port}`))