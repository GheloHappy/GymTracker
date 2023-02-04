import express from "express";
import {
    showUsers,
    createUser,
} from "../controllers/userCont.js";

const router = express.Router();
//users
router.get("/users", showUsers);
router.post("/user", createUser);
// router.post('/login', loginUser);
// router.post('/protected', validateToken);

export default router;