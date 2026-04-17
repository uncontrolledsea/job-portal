const User = require("../models/user");
const jwt = require("jsonwebtoken");

const isAuthenticated =async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(400).json({message:"No token provided"})
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user=await User.findById(decoded.id).select("-password");
        next();

    } catch (error) {
        return res.status(500).json({message:"Server Error"})   
    }
}

const authorizeRole=(...roles)=>{
    // console.log("User role:", req.user.role);
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message:`role(${req.user.role} is not allowed to access resource)`
            })
        }
        next();
    }
}


module.exports={
    isAuthenticated,authorizeRole
}