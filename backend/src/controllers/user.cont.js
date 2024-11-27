import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.util.js';

// @route   POST /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            fullName,
            email,
            password
        });
        await generateToken(user, res);
        if (user) {
            return res
                .status(201)
                .json({
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                }
            );
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

        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found. Please Register.' });
        }

        if (user && await user.correctPassword(password)) {
            await generateToken(user, res);
            return res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            });
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
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route   PATCH /api/users/update
export const updateUser = async (req, res) => {
    try {
        if (!req.user._id || req.body) {
            return res.status(400).json({ message: 'Invalid user data' });
        }
        const { fullName, email, password } = req.body;

        let user;
        if (password) {
            user = await User.findByIdAndUpdate(
                req.user._id,
                { fullName, email, password },
                { new: false, runValidators: true }
            );
        } else {
            user = await User.findByIdAndUpdate(
                req.user._id,
                { fullName, email },
                { new: true, runValidators: true }
            );
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if(password) {
            res.clearCookie('token');
        }

        return res.status(200).json({});
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