const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');


router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

require('dotenv').config()

router.get('/', (req,res)=>{
    res.render('MailSender.ejs')
})
router.post('/send', (req,res)=>{
    
    console.log(req.body.toEmail)
    console.log(req.body.subject)
    console.log(req.body.emailText)
    console.log(req.body.file)

    let transport = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD 
        }
    })
    
    const mailOptions = {
        from: process.env.EMAIL_USERNAME, // Sender address
        to: req.body.toEmail, // List of recipients
        subject: req.body.subject, // Subject line
        text: req.body.emailText,
        //static attechments
        attachments : [
            {filename : 'download.jpg', path: './download.jpg' }
        ]
    }; 

    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
})

module.exports = router