const express = require("express");

const Job = require("../models/jobs")
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();
router.post("/create",isAuthenticated,authorizeRole("employer"),async(req,res)=>{
    try {
        const {title,description,company,location}=req.body;

    if(!title||!description||!company){
        return res.status(400).json({
            message:"All required field are missing"
        })
    }

    await Job.create({
        title,
        description,
        company,
        location,
        createBy:req.user._id,
    })
    res.status(201).json({
        message:"Job created successfully"
    })
    } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
        message: error.message
    })
}
}
)
router.get("/", async (req, res) => {
    try {

        // 1️⃣ Build Query Object
        let query = {};

        if (req.query.keyword) {
            query.title = {
                $regex: req.query.keyword,
                $options: "i"
            };
        }

        if (req.query.location) {
            query.location = req.query.location;
        }

        if (req.query.company) {
            query.company = req.query.company;
        }

        // 2️⃣ Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // 3️⃣ Execute Query
        const jobs = await Job.find(query)
            .populate("createBy", "name role")
            .skip(skip)
            .limit(limit);

        const totalJobs = await Job.countDocuments(query);

        res.status(200).json({
            success: true,
            totalJobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            jobs
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
router.get(
  "/employer",
  isAuthenticated,
  authorizeRole("employer"),
 async (req, res) => {
  const jobs = await Job.find({ createBy: req.user.id });

  res.json({
    success: true,
    jobs,
  });}
);
router.put("/:id",isAuthenticated,authorizeRole("employer"), async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id);
        if(!job){
           return res.status(404).json({message:"Job not found to update."})
        }
        if(job.createBy.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are permitted to update only your jobs"})
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        return res.status(200).json({
            message:"job updated successfully",
            updatedJob
        })


    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })

        }
})
router.delete("/delete/:id",isAuthenticated,authorizeRole("employer"), async(req,res)=>{
    try {
        const job = await Job.findById(req.params.id);
        if(!job){
           return res.status(404).json({message:"Job not found ."})
        }
        if(job.createBy.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are permitted to delete only your jobs"})
        }

        await job.deleteOne();

        return res.status(200).json({
            message:"job deleted successfully"})


    } catch (error) {
        return res.status(500).json({
            message:error.message,
        })

        }
})
module.exports=router;
