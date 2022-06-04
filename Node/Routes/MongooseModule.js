const mongoose = require('mongoose');
const express = require('express')
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const upload = multer({dest : 'uploads'})
const path = require('path');



router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 
router.use(cors())

mongoose.connect("mongodb+srv://shivghariwala:shiv21112@cluster0.iaksp.mongodb.net/Shiv")
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));

var UserSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    salary : Number,
    file : String,
    galary : Array
})
var User = mongoose.model('User', UserSchema, 'auth');

// router.post('/signin', (req,res)=>{
//     console.log("In sign In")

//     var User1 = new User ({
//         username : req.body.username,
//         email : req.body.email,
//         password : req.body.password,
//         salary : req.body.salary,
//         file : req.body.file
//     })    

//     console.log(req.body.username)
//     console.log(req.body.password)

//     User1.save((err, user)=>{
//         if(!err){
//             console.log('User Saved')
//         }else{
//             console.log('Error : '+ err)
//         }
//     })

//     res.send("Done")
// })

router.post('/login', (req,res)=>{
    var username = req.body.username
    var password = req.body.password
    
    var isAuthenticate = false

    // User.find({username : username},(err,data)=>{
    //     console.log(data[0].password)
    //     if(data[0].password === password){
    //         isAuthenticate = true
    //         console.log("Login Success.")
    //     }else{
    //         isAuthenticate = false
    //         console.log("Login Failed.")
    //     }
    //     return res.status(200).json({message : "Success", authenticate : isAuthenticate, username : username})
    // })

    User.find({username : username}).then((data)=>{
        if(data[0].password === password){
            isAuthenticate = true
            console.log("Login Success.")
        }else{
            isAuthenticate = false
            console.log("Login Failed.")
        }
        return res.status(200).json({message : "Success", authenticate : isAuthenticate, username : username})
    }).catch(()=>{
        return res.status(200).json({message : "Fail", authenticate : isAuthenticate, username : username})
    })

})

router.post('/getData', (req,res)=>{
    var username = req.body.name
    User.find({username : username},(err,data)=>{
        return res.status(200).json({message : "Success" , data : data})
    })
})

router.post('/updateData',upload.single('avatar'),(req,res)=>{
    
    if(req.file){
        let fileType = req.file.mimetype.split('/')[1]
        let newFilename = req.file.filename + '.'+ fileType
        console.log('data', req.file.filename, newFilename)
        
        fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
            console.log('File Uploaded')
            res.send('200')
        })

        var username = req.body.username
        var email = req.body.email
        var password = req.body.password
        var salary = req.body.salary
        var id = req.body.id
        var file = newFilename

        User.updateOne({_id : id}, {username : username, email : email, password : password, salary : salary, file : file}).then(()=>{console.log('Hello')})
    }else{
        User.updateOne({_id : req.body.id}, req.body).then(()=>{console.log('Hello')})
    }

    
})

router.get('/allData',(req,res)=>{
    User.find({},(err,data)=>{
        return res.status(200).json({message : "Success" , data : data})
    })
})

router.post('/uploadFile', upload.single('avatar'), (req,res)=>{
    
    let fileType = req.file.mimetype.split('/')[1]
    let newFilename = req.file.filename + '.'+ fileType
    console.log('data', req.file.filename, newFilename)
    
    fs.rename(path.resolve(process.cwd(), `uploads/${req.file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
        console.log('File Uploaded')
    })
    // console.log(fileNames, "array")
    var User1 = new User ({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        salary : req.body.salary,
        file : newFilename
    })    

    User1.save((err, user)=>{
        if(!err){
            console.log('User Saved')
        }else{
            console.log('Error : '+ err)
        }
    })

    // console.log(fileNames)
    res.send()


})
var storageFiles = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
      let ext = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, file.originalname + "-" + Date.now() + ext);
    }
  });
  
  var uploadFiles = multer({ storage: storageFiles });
  
  
  router.post("/multiple", uploadFiles.array("galary", 10), function(req, res, err) {
    if (err) {
      console.log(err);
    }
    
    console.log(req.body.username)
    var files = req.files
    var NewFile = []

    // eslint-disable-next-line array-callback-return
    files.map((i)=>{
        NewFile.push(i.filename)
    })

    console.log(NewFile)
    
    User.updateOne({username : req.body.username}, {$set: { galary: NewFile}}).then((res) => {
        console.log('res', res)
    }).catch((err) => {
        console.error('err', err)
    })

    return res.send("og")
  });

// router.post('/multiple',upload.array('galary'),(err,req,res)=>{
//     console.log(err.filename)
//     console.log(req.files)
//     var files = req.files
//     var fileNames = []

//     files.map((file)=>{
        
//         let fileType = file.mimetype.split('/')[1]
//         let newFilename = file.filename + '.'+ fileType
        
//         fileNames.push(newFilename)

//         console.log('data', file.filename, newFilename)
        

//         fs.rename(path.resolve(process.cwd(), `uploads/${file.filename}`), path.resolve(process.cwd(), `uploads/${newFilename}`), (data)=>{
//             console.log('File Uploaded')
            
//         })
//     })

//     console.log(fileNames)
//     res.send('200')
    
// })

module.exports = router