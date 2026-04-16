const express = require("express");
const { register,login } = require("../controllers/user");
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile",isAuthenticated, (req,res)=>{
     res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user
  });
})

router.post('/post-job', isAuthenticated, authorizeRole("Employer"),(req,res)=>{
  res.json({message:"Job posted Successfully!"})
});
router.post('/apply-job', isAuthenticated, authorizeRole("user"),(req,res)=>{
  res.json({message:"Applied for the job Successfully!"})
});

module.exports = router;