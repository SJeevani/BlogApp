// create author-api app
const exp=require('express')
const authorApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../middlewares/verifyToken')

let authorsCollection
let articlesCollection
authorApp.use((req,res,next)=>{
    authorsCollection=req.app.get('authorsCollection')
    articlesCollection=req.app.get('articlesCollection')
    next()
})

// user registration route
authorApp.post('/author',expressAsyncHandler(async(req,res)=>{
    // get author resource from client
    const newAuthor=req.body
    // check for duplicate authors based on username
    const dbAuthor=await authorsCollection.findOne({username:newAuthor.username})
    // if author found in db
    if (dbAuthor!==null){
        res.send({message:"Author already exists"})
    }
    else{
        // hash paasword
        const hashedPassword=await bcryptjs.hash(newAuthor.password,5)
        // replace plain password with hashed password
        newAuthor.password=hashedPassword
        // create new user
        await authorsCollection.insertOne(newAuthor)
        // send repsonse
        res.send({message:"New author created"})
    }
}))

// author login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    // get author credentails from client
    const authorCred=req.body
    // check for username
    const dbAuthor=await authorsCollection.findOne({username:authorCred.username})
    if (dbAuthor===null){
        res.send({message:"Invalid username"})
    }else{
        // check for password
        const status=await bcryptjs.compare(authorCred.password,dbAuthor.password)
        if(status===false){
            res.send({message:"Invalid password"})
        }else{
            // create jwt token and encode it
            const signedToken=jwt.sign({username:dbAuthor.username},process.env.SECRET_KEY,{expiresIn:'1d'})
             // send res
            res.send({message:"Login success",token:signedToken,user:dbAuthor})
        }
    }
}))

// adding new article by author
authorApp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get new article from client
    const newArticle=req.body
    // console.log(newArticle)
    // post to articles collection
    await articlesCollection.insertOne(newArticle)
    // send res
    res.send({message:"New article created"})

}))

// update article by author
authorApp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get modified article from client
    const modifiedArticle=req.body
    // update by article id
    let result=await articlesCollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlesCollection.findOne({articleId:modifiedArticle.articleId})
    // console.log(result)
    res.send({message:"Article modified",article:latestArticle})
}))

// delete article by articleId
authorApp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get articleID from url
    const articleIdFromUrl=(+req.params.articleId)
    // get article
    const articleToDelete=req.body

    if(articleToDelete.status===true){
        let modifiedArt= await articlesCollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
        res.send({message:"Article deleted",payload:modifiedArt.status})
     }
     if(articleToDelete.status===false){
         let modifiedArt= await articlesCollection.findOneAndUpdate({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
         res.send({message:"Article restored",payload:modifiedArt.status})
     }
}))


// get all the articles of a author
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    // get name of the author from url params
    const nameOfAuthor=req.params.username
    // find articles by username and status is true
    const articlesList=await articlesCollection.find({username:nameOfAuthor}).toArray()
    // send res
    res.send({message:"articles",payload:articlesList})
}))

// export authorApp
module.exports=authorApp