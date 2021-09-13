const express=require('express')
const app=express()
const env=require('dotenv')
const connectDb=require('./config/db.js')
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

env.config({path:'./config/config.env'})

connectDb()


app.use(cors())
app.use('/users',require('./route/users.js'))
app.use('/redaction',require('./route/articles.js'))
app.use('/images',express.static(path.join(__dirname,'images')))
app.get('*',(req,res)=>{
    res.send('<h1> app fonctionnelle </h1>')
})
app.listen(process.env.PORT || 3000)


