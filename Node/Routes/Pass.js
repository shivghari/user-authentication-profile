const bcrypt = require("bcryptjs")
var pass = "test123"

bcrypt.hash(pass, 12).then((hash)=>{console.log(hash)})

bcrypt.compare('test123', '$2a$12$DS2BRFEQAL.D7hSYdxn/E.jopRhRKZzt.qGw1p7HjvQvlXIqZ87mu', (err, isMatch)=>{
    if(!err){
        console.log(isMatch)
    }
})
