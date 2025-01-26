// Importing modules
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require('path');

const app = express();
app.use(express.json());

// Dummy user data
const dummyUser = {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123", // For testing purposes only
};
app.get("/", async (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Login endpoint

app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    // Simulating user lookup
    if (dummyUser.email !== email || dummyUser.password !== password) {
        const error = new Error("Invalid email or password. Please try again.");
        return next(error);
    }

    let token;
    try {
        // Creating JWT token
        token = jwt.sign(
            {
                userId: dummyUser.id,
                email: dummyUser.email,
            },
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.error(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: {
            userId: dummyUser.id,
            email: dummyUser.email,
            token: token,
        },
    });
});

// Signup endpoint
app.post("/signup", async (req, res, next) => {
    const { name, email, password } = req.body;

    // Simulating user creation
    const newUser = {
        id: "2",
        name,
        email,
        password,
    };

    let token;
    // try {
    //     // Creating JWT token
    //     token = jwt.sign(
    //         {
    //             userId: newUser.id,
    //             email: newUser.email,
    //         },
    //         "secretkeyappearshere",
    //         { expiresIn: "1h" }
    //     );
    // } catch (err) {
    //     console.error(err);
    //     const error = new Error("Error! Something went wrong.");
    //     return next(error);
    // }

    res.status(201).json({
        success: true,
        // data: {
        //     userId: newUser.id,
        //     email: newUser.email,
        //     token: token,
        // },
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
