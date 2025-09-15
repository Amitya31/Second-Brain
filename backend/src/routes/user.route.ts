import { Router } from "express";
import { loginser, logoutUser, refreshAccessToken, registerUser } from "../Controllers/auth.controller";

const router = Router();
//@ts-ignore
router.post('/user/register', registerUser)
//@ts-ignore
router.post('/user/login', loginser)
//@ts-ignore
router.post("/user/refresh", refreshAccessToken);
router.post("/user/logout", logoutUser);

export default router;