const express = require('express')
const fs = require('fs')
const router = express.Router()
const Functions = require('../Function')

router.get('/', (req,res)=>{
    res.send('Current Executing Script Path : ' + Functions.returnCurrentPath())
})

router.get('/add/:a/:b', (req,res)=>{
    res.send(Functions.add(Number(req.params.a), Number(req.params.b)).toString())
})

router.get('/sub/:a/:b', (req,res)=>{
    res.send(Functions.sub(Number(req.params.a), Number(req.params.b)).toString())
})

router.get('/mul/:a/:b', (req,res)=>{
    res.send(Functions.mul(Number(req.params.a), Number(req.params.b)).toString())
})

router.get('/div/:a/:b', (req,res)=>{
    res.send(Functions.div(Number(req.params.a), Number(req.params.b)).toString())
})

module.exports = router