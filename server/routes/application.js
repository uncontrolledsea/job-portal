const express = require("express");
const Application = require("../models/application")
const Job = require("../models/jobs")
const upload = require("../middleware/upload")
const { isAuthenticated, authorizeRole } = require("../middleware/auth");

const router = express.Router();
router.get("/user", isAuthenticated, async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job")   // to get job details
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
    });
  }
});
router.post("/apply/:jobId",isAuthenticated,authorizeRole("user"),upload.single("resume"),async(req,res)=>{
    try {
         if (!req.file) {
                return res.status(400).json({
                    message: "Resume file is required"
                });
            }

        const job = await Job.findById(req.params.jobId);
        if(!job){
            return res.status(400).json({message:"Job is not present"})
        }

        const alreadyApplied = await Application.findOne({job:req.params.jobId,applicant :req.user._id});
        if(alreadyApplied){
            return res.status(400).json({message:"You have already applied"})
        }

        await Application.create({
            job:req.params.jobId,
            applicant:req.user._id,
            resume:req.file.path

        })
        res.status(201).json({
                message: "Applied successfully"
            });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

router.get("/job/:jobId",
    isAuthenticated,
    authorizeRole("employer"),
    async (req, res) => {
        try {
            const applications = await Application.find({
                job: req.params.jobId
            }).populate("applicant", "name email");

            res.status(200).json({
                applications
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);
router.put("/status/:id",isAuthenticated,authorizeRole("employer"),async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
})

router.get("/dashboard",isAuthenticated,authorizeRole("employer"),async(req,res)=>{
    try {
        const jobs = await Job.find({createBy:req.user._id});
        const jobIds = jobs.map(job=>job._id);

        const totalApplication = await Application.countDocuments({
            job:{$in:jobIds}
        });
        const accepted = await Application.countDocuments({
            job:{$in:jobIds},
            status:"Accepted"
        });
        const rejected = await Application.countDocuments({
            job:{$in:jobIds},
            status:"Rejected"
        });
        const pending = await Application.countDocuments({
            job:{$in:jobIds},
            status:"Pending"
        });

        res.status(200).json({
            totalJobs:jobs.length,
            totalApplication,
            accepted,
            rejected,
            pending
        })
    } catch (error) {
        res.status(500).json({message :error.message})
    }
})



module.exports=router;
