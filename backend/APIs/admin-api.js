// create admin-api app
const exp=require('express')
const adminApp=exp.Router()

adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"this is from admin-api"})
})

// export adminApp
module.exports=adminApp