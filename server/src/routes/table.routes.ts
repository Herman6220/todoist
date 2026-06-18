import { Router } from "express";
import { createUserTable, deleteUserTable, getTableByTitle, getUserTables } from "../controllers/table.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/").post(verifyJWT, createUserTable).get(verifyJWT, getUserTables);
router.route("/id/:tableId").delete(verifyJWT, deleteUserTable);
router.route("/title/:tableTitle").get(verifyJWT, getTableByTitle);

export default router;