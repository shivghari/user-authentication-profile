const express = require('express')
const axios = require('axios')
const json = require('json')

const router = express.Router()

router.get('/',(req,res)=>{
    axios.get('http://localhost:8000/users').then((response)=>{
        console.log(response.data)
        res.send(response.data)
    })
})

router.post('/addData/:name/:salary', (req,res)=>{
    var name = req.params.name
    var salary = Number(req.params.salary)
    axios.post('http://localhost:8000/users',{name, salary}).then(()=>{
            axios.get('http://localhost:8000/users').then((response)=>{
            console.log(response.data)
            res.send(response.data)
        })
    })
})

router.delete('/deleteData/:id', (req,res)=>{
    var id = Number(req.params.id)
    console.log(id)
    axios.delete('http://localhost:8000/users/'+id).then(()=>{
            axios.get('http://localhost:8000/users').then((response)=>{
            console.log(response.data)
            res.send(response.data)
        })
    })
})

router.put('/update/:id/:name/:salary', (req,res)=>{
    var id = Number(req.params.id)
    var name = req.params.name
    var salary = Number(req.params.salary)

    axios.put('http://localhost:8000/users/'+id , {
        name : name,
        salary : salary
    }).then(()=>{
        axios.get('http://localhost:8000/users').then((response)=>{
            console.log(response.data)
            res.send(response.data)
        })
    })
})

module.exports = router