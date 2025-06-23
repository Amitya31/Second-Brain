import { Router } from "express";
import { loginser, registerUser } from "../Controllers/auth.controller";

const router = Router();

router.post('/user/register', registerUser)
//@ts-ignore
router.post('/user/login', loginser)

export default router;