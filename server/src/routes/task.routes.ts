import { Router } from "express";
import { createTask, deleteTask, getTableTask, toggleTaskComplete, updateTask } from "../controllers/task.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").post(verifyJWT, createTask);
router.route("/table/:tableId").post(verifyJWT, createTask).get(verifyJWT, getTableTask);
router.route("/:taskId").delete(verifyJWT, deleteTask).patch(verifyJWT, updateTask);
router.route("/toggleComplete/:taskId").patch(verifyJWT, toggleTaskComplete);

export default router;