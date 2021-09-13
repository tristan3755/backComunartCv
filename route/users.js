const express=require('express')
const jwt=require('jsonwebtoken')
const router=express.Router()
const bcrypt=require('bcryptjs')
const usersSchema=require('../models/users.js')
const multer=require('../middleware/multerConfigProfils.js')
const auth=require('../middleware/auth.js')
const path=require('path')
const fs=require('fs')

router.post('/inscription',multer,(req,res)=>{
   bcrypt.hash(req.body.password,10)
   .then(hash=>{
       const newUser= new usersSchema({
           password:hash,
           mailUsers:req.body.mailUsers,
           image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       })
      
      newUser.save((err,data)=>{
          if(!err){
                res.send(data)
            }else{
                res.status(500).json({code:500,message:'problème',utilisateurAjoutéEchec:err})
            }
       })
 
   })
})
router.post('/connexion',(req,res)=>{
    usersSchema.findOne({mailUsers:req.body.mailUsers })
    .then(user=>{
        if(!user){
            return res.status(401).json({code:401,message:"identifiants erronés"})
        }

        bcrypt.compare(req.body.password,user.password)
        .then(passwordOk=>{
            if(!passwordOk){
           return res.status(401).json({code:401,message:"password incorrect"})    
            }
            res.status(200).json({code:200,userId:user._id,token:jwt.sign({userId:user._id},
                'ramdonSecretToken',
                {expiresIn:'24h'}
            )

            })
        })
    })
})

router.get('/usersCo/:_id',auth,multer,(req,res)=>{
    usersSchema.findOne({_id:req.params._id})
    .then(user=>{
        if(!user){
            res.status(401).json({code:401,message:"problême chargement des utilisateurs"})
        }else{
            res.send(user)
        }
    })
    .catch(error=>{
        res.send(error).status(500)
    })
})

module.exports=router