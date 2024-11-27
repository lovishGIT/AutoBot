import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const verifyJWT = (req, res, next) => {
    const token =
        req?.headers['authorization'] ||
        req?.cookies?.token ||
        req?.headers?.cookie?.toString()?.split('token=')[1] ||
        req?.headers['authorization']?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    if (!JWT_SECRET) {
        console.error('[Environment]: JWT_SECRET is not defined');
        return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ message: 'Wrong Token detected.' });
        }

        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Failed to authenticate token' });
    }
};

export default verifyJWT;