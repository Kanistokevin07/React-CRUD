const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
    
    try{
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email, 
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            user
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
};

exports.login = async (req,res)=>{

    try{

        const { email, password} = req.body;
        console.log("LOGIN BODY:", req.body);
        const user = await User.findOne({ email });

        console.log(user);
        if(!user)
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        
        if(!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            {
                id: user._id
                ,role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        )

        res.json({
            messaage: "Login successful",    
            token,
            user: {
                _id: user._id,
                role: user.role,
                email: user.email
            }
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }

};

exports.profile = async(req, res)=>{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
};

exports.updateProfile = async (req,res)=>{
    try {
        const userId = req.user.id;
        const {name, email} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name, email},
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.changePassword = async (req, res)=>{

    try{
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        if (!user) 
            return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch)    
            return res.status(400).json({ message: "Old password is incorrect" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password changed successfully" });
    }
    catch(error){
        return res.status(400).json({message: error.message});
    }
    
};

exports.logout = async (req, res)=>{
    return res.status(201).json({ message: "Sucessfully logged out" });
};