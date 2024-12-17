const jwt = require("jsonwebtoken")

const tokenCreation = (user)=>{
    return jwt.sign({userId : user._id, email : user.email},process.env.JWT_KEY,{expiresIn: 60 * 60})
}

module.exports = {tokenCreation}