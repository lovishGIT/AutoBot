import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) return res
                .status(400)
                .json({message: 'Please provide fullName, email and password'});

        const user = await User.findOne({ email })
        if (user) return res
                .status(401)
            .json({ message: 'User Already Registered! Please Login.' });

        const newUser = await User.create({
            fullName, email, password
        });
        await newUser.save();
        const dataTobeShared = {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
        return res.status(201).json(dataTobeShared);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server error!' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res
            .status(400)
            .json("Please Fill All Details.");

        // console.log(email, password);


        const findUser = await User.findOne({ email });
        if (!findUser) return res
            .status(404)
            .json("User Not Found! Please Register.");

        const checkPass = await bcrypt.compare(password, findUser.password);
        if (!checkPass) {
            return res
                .status(400)
                .json("Wrong Password");
        } else {
            const dataTobeShared = {
                id: findUser._id,
                fullName: findUser.fullName,
                email: findUser.email,
                createdAt: findUser.createdAt
            }
            return res
                .status(200)
                .json(dataTobeShared);
        }
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json("Internal Server Error.");
    }
};

