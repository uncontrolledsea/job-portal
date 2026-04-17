const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user")
const jobRoutes = require("./routes/jobs")
const appRoutes = require("./routes/application")
dotenv.config();
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use(cors())
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", appRoutes);
app.get('/',(req,res)=>{
    return res.send("job portal server started")
})

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});