const mongoose=require('mongoose')
const articleSchema=mongoose.Schema({

    titre:{
        type:String,
        require:true,
    },
    text:{
        type:String,
        require:true,
    },
    categorie:{
        type:String,
        require:true,
    },
    auteur:{
        type:String,
        require:true,
    },
    imageArticle:{
        type:String,
    },
    idUser:{
        type:String,
        require:true,  
    },
    idUserImage:{
        type:String,
        require:true,  
    }
},{timestamps:true})

module.exports=mongoose.model('articles',articleSchema)