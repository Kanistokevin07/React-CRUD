const User = require("../models/User");

exports.getUsers = async(req,res)=>{
    try{
        let users;
        if(req.user.role === "admin")
            users = await User.find();
        else if(req.user.role === "manager")
            users = await User.find({ role: "employee" });
        else
            return res.status(403).json({ message: "Not allowed" });

        res.json(users);
    }
    catch(error){
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (req.user.role === "manager" && user.role !== "employee") {
        return res.status(403).json({ message: "Not allowed" });
    }

    if (req.user.role === "employee" && req.user.id !== user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
    }

    res.json(user);
};

exports.updateSalary = async (req, res) => {
    const { salary } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "Not found" });

    if (req.user.role === "manager" && user.role !== "employee") {
        return res.status(403).json({ message: "Managers only for employees" });
    }

    user.salary = salary;
    await user.save();

    res.json(user);
};

exports.updateRole = async (req, res) => {
    const { role } = req.body;

    const allowedRoles = ["admin", "manager", "employee"];

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
    }

    const user = await User.findById(req.params.id);
    if(!user)
        return res.status(404).json({error: "user not present" });

    user.role = role;
    await user.save();

    res.json(user);
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted" });
};

exports.updateStatus = async (req, res) => {
    const { status } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "Not found" });
    }

    if (req.user.role === "manager" && user.role !== "employee") {
        return res.status(403).json({ message: "Managers only for employees" });
    }

    user.status = status;
    await user.save();

    res.json(user);
};