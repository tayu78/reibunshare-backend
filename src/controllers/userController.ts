import { RequestHandler } from "express";


export const getUserData: RequestHandler = async (req, res) => {
    const  { user } = req.userData!;
        return res.status(200).json({
            user
        })
}

export const updateUserInfo: RequestHandler = async (req,res,next) => {
    const { user } = req.userData!;
    try {
        
    } catch (err) {
        next(err)
    }
}