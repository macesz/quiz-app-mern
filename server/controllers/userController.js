import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const signUpUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email or username." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Sign up failed" });
    }
};

export const signInUser = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ username });
    } catch {
        const error = new Error("Error! Something went wrong!");
        return next(error);
    }

    if (!existingUser) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    let token;
    try {
        token = jwt.sign(
            { username: existingUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong during generating token");
        return next(error);
    }

    res.status(200).json({ token, user: { username: existingUser.username, email: existingUser.email } });
}

export const updateUser = async (req, res) => {
    
    const userExists = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
        _id: { $ne: req.user._id },
    });
    if (userExists) {
        return res.status(400).json({ message: "User already exists with this email or username." });
    }

    if (req.body.password) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        } catch (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }
    }

    try {
        const updateUser = await User.findOneAndUpdate({ username: req.user.username }, { $set: { ...req.body } }, { new: true })

        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const refreshedToken = jwt.sign(
            { username: updateUser.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({ refreshedToken, user: { username: updateUser.username, email: updateUser.email } });
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ username: req.user.username });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile successfully deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}