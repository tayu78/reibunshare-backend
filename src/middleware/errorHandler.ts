import {Request,Response,NextFunction} from "express"

const errorHandler = (err: Error ,req:Request ,res: Response,next: NextFunction) => {
    return res.json({
        message: "Something went wrong.",
        err
    })
}

export default errorHandler;