import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword, sendPasswordResetMail } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

//auth routes
router.route("/auth/signup").post(registerUser);
router.route("/auth/signin").post(loginUser);
router.route("/auth/refreshAccessToken").post(refreshAccessToken);

//secured routes
router.route("/auth/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("/signout").post(verifyJWT, logoutUser);

router.route("/sendPasswordResetMail").post(sendPasswordResetMail);
router.route("/resetPassword").patch(resetPassword);

export default router;