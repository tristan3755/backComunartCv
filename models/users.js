const mongoose=require('mongoose')

const uniqueValidator=require('mongoose-unique-validator')


const usersSchema=mongoose.Schema({
    mailUsers:{
        require:true,
        type:String,
        unique:true,    
    },
    password:{
        require:true,
        type:String,
    },
    image:{
        require:true,
        type:String,
    },
})

usersSchema.plugin(uniqueValidator)

module.exports=mongoose.model('users',usersSchema)