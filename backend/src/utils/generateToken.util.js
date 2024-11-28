import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;
const generateToken = (user, res) => {
    if(!JWT_SECRET) {
        console.error('[Environment]: JWT_SECRET is not defined');
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    console.log("setting token ", token, "in cookie");


    return token;
};

export default generateToken;