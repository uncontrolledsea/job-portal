const mongoose = require("mongoose")

const appSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
    ,resume:{
        type:String,
        required:true
    }
}, { timestamps: true }
);

module.exports=mongoose.model("Application",appSchema)