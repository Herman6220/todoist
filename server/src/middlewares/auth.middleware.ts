import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { User, type UserInterface } from "../models/user.model";

// interface VerifyRequest extends Request{
//     user?: UserInterface;
// }

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {accessToken} = req.cookies

        // console.log(accessToken);
        
        if(!accessToken){
            return res.status(403).json({message: "Forbidden."});
        }
    
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    
        if(!user){
            return res.status(401).json({message: "Invalid access token."});
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.log(error instanceof jwt.TokenExpiredError);
        if(error instanceof jwt.TokenExpiredError){
            return res.status(401).json({message: "Token expired."});
        }
        return res.status(500).json({message: "Internal server error."});
    }
}
