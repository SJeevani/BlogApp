// create user-api app
const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../middlewares/verifyToken')

let usersCollection
let articlesCollection
// get user collection object
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

// user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    // get user resource from client
    const newUser=req.body
    // check for duplicate users based on username
    const dbUser=await usersCollection.findOne({username:newUser.username})
    // if user found in db
    if (dbUser!==null){
        res.send({message:"User already exists"})
    }
    else{
        // hash paasword
        const hashedPassword=await bcryptjs.hash(newUser.password,5)
        // replace plain password with hashed password
        newUser.password=hashedPassword
        // create new user
        await usersCollection.insertOne(newUser)
        // send repsonse
        res.send({message:"New user created"})
    }
}))

// user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get user credentails from client
    const userCred=req.body
    // check for username
    const dbUser=await usersCollection.findOne({username:userCred.username})
    if (dbUser===null){
        res.send({message:"Invalid username"})
    }else{
        // check for password
        const status=await bcryptjs.compare(userCred.password,dbUser.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            // create jwt token and encode it
            const signedToken=jwt.sign({username:dbUser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
             // send res
            res.send({message:"Login success",token:signedToken,user:dbUser})
        }
    }
}))

// get articles of all authors
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get articles collection from express app
    const articlesCollection=req.app.get('articlesCollection')
    // get all articles
    let articlesList=await articlesCollection.find({status:true}).toArray()
    // send res
    res.send({message:"articles",payload:articlesList})
}))


// post comments for an article by article id
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get user comment object and articleId
    const userComment=req.body
    const articleIdFromUrl=(+req.params.articleId)
    // insert userComment object to comments array of article byid
    let result=await articlesCollection.updateOne({articleId:articleIdFromUrl},{$addToSet:{comments:userComment}})
    console.log(result)
    res.send({message:"Comment posted"})
}))


// export user  App
module.exports=userApp



