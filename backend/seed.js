const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/employee_management")
    .then(() => console.log("MongoDB Connected for Seeding"))
    .catch(err => console.log(err));

const seedUsers = async () => {
    try {
        // clear existing users (optional but useful for testing)
        //await User.deleteMany();

        const hashedPassword = await bcrypt.hash("123456", 10);

        const users = [
            {
                name: "Admin User",
                email: "admin@test.com",
                password: hashedPassword,
                role: "admin",
                department: "HR",
                status: "active"
            },
            {
                name: "Manager One",
                email: "manager1@test.com",
                password: hashedPassword,
                role: "manager",
                department: "IT",
                status: "active"
            },
            {
                name: "Manager Two",
                email: "manager2@test.com",
                password: hashedPassword,
                role: "manager",
                department: "Finance",
                status: "active"
            }
        ];

        await User.insertMany(users);

        console.log("✅ Seed data inserted successfully");
        process.exit();

    } catch (err) {
        console.log("❌ Error seeding data:", err);
        process.exit(1);
    }
};

seedUsers();