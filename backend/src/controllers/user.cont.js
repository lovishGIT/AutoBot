import User from '../models/user.model.js';
import { deleteFromCloud, uploadToCloud } from '../utils/cloudinary.util.js';
import generateToken from '../utils/generateToken.util.js';

// @route   POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let avatar = undefined;

        // console.log(req.files, req.file);


        if (req.files || req.file) {
            avatar = req.file.path || req.files[0].path;
            if(avatar) {
                avatar = await uploadToCloud(avatar);
            } else {
                avatar = undefined;
            }
        }

        const user = await User.create({
            fullName,
            email,
            password,
            avatar,
        });
        await generateToken(user, res);
        if (user) {
            return res
                .status(201)
                .json(user.toJSON());
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found. Please Register.' });
        }

        if (await user.correctPassword(password)) {
            await generateToken(user, res);
            return res.status(200).json(user.toJSON());
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/users/me
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('projects');
        return res.status(200).json(user?.toJSON());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route   PATCH /api/users/update
export const updateUser = async (req, res) => {
    try {
        if (!req.user._id || !req.body) {
            return res.status(400).json({ message: 'Invalid user data' });
        }

        let user = await User.findByIdAndUpdate(
                req.user._id,
                { ...req.body },
                { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let avatar;
        if (req.file) {
            avatar = req.file.path;
            if (avatar) {
                await deleteFromCloud(user.avatar?.public_id);
                avatar = await uploadToCloud(avatar);
                user.avatar = avatar;
                await user.save();
            }
        }

        if(req.body.password) {
            res.clearCookie('token');
        }

        return res.status(200).json(user.toJSON());
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/users/logout
export const logoutUser = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = null;
        res.clearCookie('token');
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/users/verify
export const verifyToken = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};