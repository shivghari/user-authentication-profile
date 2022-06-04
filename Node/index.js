const express = require('express')
const path = require('path')

const FileModule = require('./Routes/FileModule')
const PathModule = require('./Routes/PathModule')
const EJS = require('./Routes/EJS')
const NodeMail = require('./Routes/NodeMailer')
const CRUDPostman = require('./Routes/CRUDPostman')
const MongoModule = require('./Routes/mongodb')
const MongooseModule = require('./Routes/MongooseModule')

const app = express()
app.use('/static', express.static(path.resolve('uploads')))

app.use('/file',FileModule)
app.use('/path', PathModule)
app.use('/ejs', EJS)
app.use('/nodemail', NodeMail)
app.use('/postman', CRUDPostman)
app.use('/mongo', MongoModule)
app.use('/mongoose', MongooseModule)



app.listen(3001) 