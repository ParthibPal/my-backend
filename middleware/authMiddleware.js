const jwt = require('jsonwebtoken');

//middleware to verify JWT
const auth = (req,res, next) => {
    const token = req.header("Authorization");  //expecting token in request header

    //if no token found
    if(!token) return res.status(401).json({msg: "No token, access denied"});

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode.id;   //add user id to request object
        next(); //proceed to next midleware
    }catch(err){
        res.status(400).json({msg: "Invalid token!"})
    }
}

module.exports = auth;