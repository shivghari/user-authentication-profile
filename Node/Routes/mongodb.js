const { Route } = require('express');
const { response } = require('express');
const express = require('express')
const fs = require('fs')
const router = express.Router()
const Functions = require('../Function')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shivghariwala:shiv21112@cluster0.iaksp.mongodb.net/test";


router.get('/insert/:user/:pass', (req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Shiv");
        var myobj = { 
            username: req.params.user , password: req.params.pass 
        };
        dbo.collection("users").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    res.redirect('/mongo/showData')
})

router.get('/showData', (req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Shiv");
        dbo.collection("users").find({}).toArray((err, response)=>{
            res.send(response)
        });
    });
})

router.get('/deleteByname/:name', (req,res)=>{
    var name = req.params.name 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Shiv");
        dbo.collection("users").deleteOne({username : name}).then((err, response)=>{
            if(!err){
                console.log("data Deleted Successfully")
            }
        });
    });
    res.redirect('/mongo/showData')
})


router.get('/update/:username/:pass', (req,res)=>{
    var username = req.params.username
    var pass = req.params.pass

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Shiv");
        dbo.collection("users").updateOne({username : username}, {$set : {password : pass}}).then((err, response)=>{
            if(!err){
                console.log("data Updated Successfully")
            }
        });
    });
    res.redirect('/mongo/showData')
})




module.exports = router