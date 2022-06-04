const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/name/:name', (req,res)=>{
    const filename = req.params.name
    fs.readFile(filename, 'utf8', (err, data)=>{
        res.write(data)
        console.log(data)
        res.end()
    })
})

router.get('/add/:name', (req,res)=>{
    const filename = req.params.name
    fs.appendFile(filename, 'Hello again I am B-tech Studnet.', (err)=>{
        console.log('File modified')
        res.end()
    })
})

module.exports = router