const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const keysecret = process.env.KEY

const authenticate = async(req,res,next)=>{
    try {
        const token = req.cookies.Amazonweb;
        
        const verifyToken = jwt.verify(token,keysecret);
     console.log(verifyToken);
     
        const rootUser = await USER.findOne({_id:verifyToken._id,"tokens.token":token});
       

        if(!rootUser){ throw new Error("User Not Found") };

        req.token = token; 
        req.rootUser = rootUser;   
        req.userID = rootUser._id;   
    
        next();  


    } catch (error) {
        res.status(401).send("Unauthorized:No token provided");
        console.log(error);
    }
};

module.exports = authenticate;