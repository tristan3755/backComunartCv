const multer=require('multer')
const path=require('path')

const mimetypes={
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'

}
const sauvegarde= multer.diskStorage({
destination:(req,file,callback)=>{
callback(null,'images')
},
filename:(req,file,callback)=>{
   let nom=file.originalname.split(' ').join('_')
   let ext=mimetypes[file.mimetype]
   callback(null,nom+Date.now()+'.'+ext) 
}

})

module.exports=multer({storage:sauvegarde}).single('imageArticle')
