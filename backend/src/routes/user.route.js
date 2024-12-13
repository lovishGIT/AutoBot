import express from 'express';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateUser,
    verifyToken,
    logoutUser,
} from '../controllers/user.cont.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/me', verifyJWT, getCurrentUser);
router.patch('/update', upload.single('avatar'), verifyJWT, updateUser);

router.get('/logout', verifyJWT, logoutUser);

router.get('/verify', verifyJWT, verifyToken);

export default router;