const User = require("../models/User");
const bcrypt = require("bcryptjs")  // for hashing password
const jwt = require("jsonwebtoken");    //for jwt token creation

//register controller
exports.register = async(req,res) => {
    const {username, email, password} = req.body;

    try{
        //check if the user already exist
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({msg: "User already exixts!"})
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        //create new user
        const user = await User.create({username, email, password: hashedPassword});
        res.status(201).json({msg: "User registered successfully"});
    }catch(err){
        res.status(500).json({msg: "Error in registration", error: err.message})
    }
};


//login controller
exports.login = async (req,res) => {
    const {email,password} = req.body;

    try{
        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid Credential"});
        }

        //compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid Credential"});

        //create JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        //send the token and user info(excluding password)
        res.json({token, user: {id: user._id, username: user.username, email: user.email}})
    }catch(err){
        res.status(500).json({msg:"LogIn failed", error: err.message})
    }
}