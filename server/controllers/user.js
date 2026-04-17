const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login =async(req,res)=>{
  
  const{email,password}=req.body;
  try {
      const existUser = await User.findOne({email});
      if(!existUser){
        return res.status(400).json({message:"User not Found"});
      }

      const isMatch = await bcrypt.compare(password,existUser.password);
      if(!isMatch){
        return res.status(400).json({message:"Invalid password"});

      }
      const token = jwt.sign({id:existUser._id},process.env.JWT_SECRET);
      return res.status(200).json({
        message:"User Login Successfully..",
        token,
        user: {
        id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        role: existUser.role,
      }
      })

    } catch (error) {
      return res.status(500).json({message:"Server Error!"})
    }
}