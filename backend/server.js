const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const connectDB = require("./config/db");

dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res)=>{
    res.json({
        message: "EMS running"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});