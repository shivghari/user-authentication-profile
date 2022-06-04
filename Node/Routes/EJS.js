const express = require('express')
const fs = require('fs')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

router.get('/',(req,res)=>{
    res.render('form.ejs', {name : "", pass : ""})
})

router.post('/handleData', (req,res)=>{   
    res.render('form.ejs', {name : req.body.name, pass : req.body.pass})
})

module.exports = router