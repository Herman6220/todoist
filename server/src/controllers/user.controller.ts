import type { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/SendMail";

const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Required fields are missing." });
        }

        const existingUserByUsername = await User.findOne({username});

        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const existingUserByEmail = await User.findOne({email});

        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email already exists." });
        }

        const user = await User.create({
            username,
            email,
            password,
        })

        if (!user) {
            return res.status(400).json({ message: "Some error occurred while creating user." });
        }

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            return res.status(400).json({ message: "Some error occurred while creating user." });
        }

        return res.status(200).json({ user: createdUser, message: "User registered successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email doesn't exist." });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email or Password is not correct." });
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        const updatedUser = await user.save({ validateBeforeSave: false });

        if (!updatedUser) {
            return res.status(400).json({ message: "Some error occurred." })
        }

        const { password: p, refreshToken: rt, ...userWithoutCredentials } = updatedUser.toObject();

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none" as const
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ user: userWithoutCredentials, accessToken, refreshToken, message: "User logged in successfully." });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                },
            },
            {
                returnDocument: "after",
            }
        )

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none" as const,
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User logged out successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies || req.body;

        
        if (!refreshToken) {
            return res.status(403).json({ message: "Forbidden." });
        }

        // console.log(refreshToken);

        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({ message: "Invalid refresh token." });
        }

        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        user.refreshToken = newRefreshToken;

        await user.save({ validateBeforeSave: false });

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none" as const,
        }

        return res
            .status(200)
            .cookie("accessToken", newAccessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({ accessToken: newAccessToken, refreshToken: newRefreshToken, message: "Access token refreshed successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        if(!req.user){
            return res.status(404).json({message: "Unauthorized."});
        }
        const user = await User.findById(req.user._id).select("-password -refreshToken");
        if(!user){
            return res.status(400).json({message: "No user found."});
        }
        return res.status(200).json({user, message: "User fetched successfully."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error."});
    }
}

const sendPasswordResetMail = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;

        if(!email){
            return res.status(400).json({message: "Email required."});
        }

        const user = await User.findOne({email}).select("-password -refreshToken");

        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        const passwordResetToken = jwt.sign(
            { userId: user._id },
            process.env.PASSWORD_RESET_TOKEN_SECRET!,
            {
                expiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"],
            }
        )

        const passwordResetLink = `${process.env.CLIENT_URL}/passwordReset?passwordResetToken=${passwordResetToken}`;
        const passwordResetMail = `You can reset your password here (valid only for 10 mins): ${passwordResetLink}`
        await sendMail(user.email, "", passwordResetMail);

        return res.status(200).json({message: "Password reset link sent."});
    } catch (error) {
        return res.status(500).json({message: "Internal server error."});
    }
}

const resetPassword = async (req: Request<{},{},{newPassword: string},{passwordResetToken: string}>, res: Response) => {
    try {
        const {passwordResetToken} = req.query;
        const {newPassword} = req.body;
        
    
        if(!passwordResetToken || !newPassword){
            return res.status(400).json({message: "Password and Token are required."});
        }
    
        const decodedToken = jwt.verify(passwordResetToken, process.env.PASSWORD_RESET_TOKEN_SECRET!) as jwt.JwtPayload;

        console.log(decodedToken);

        const user = await User.findById(decodedToken?.userId);

        if(!user){
            return res.status(404).json({message: "User not found."});
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).json({message: "Password reset successfully."});
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            return res.status(403).json({message: "Password reset token expired."});
        }
        return res.status(500).json({message: "Internal server error."});
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken, 
    getCurrentUser,
    sendPasswordResetMail,
    resetPassword,
}