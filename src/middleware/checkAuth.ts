import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import User from '../models/user';




const checkAuth: RequestHandler = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return res.status(401).json({
                message: "Please provide authorization header."
            })
        }
        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { userId: Types.ObjectId}

        const user = await User.findById(decodedToken.userId);
        
        if (!user) {
           return  res.status(401).json({
                message: "Auth failed. User not exist."
            })
        }
        req.userData = {user}
        next();
    } catch (err) {
        next(err)
    }
}

export default checkAuth;