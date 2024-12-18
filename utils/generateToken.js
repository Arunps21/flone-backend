const jwt = require("jsonwebtoken")

const tokenCreation = (userid)=>{
    return jwt.sign({userId : userid},process.env.JWT_KEY,{expiresIn: 60 * 60})
}

module.exports = {tokenCreation}