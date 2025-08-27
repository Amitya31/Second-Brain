import { Router } from "express";
import VerifyJwt from "../middleware/auth.middleware";
import { ShareContent, ShareLink } from "../Controllers/link.controller";

const router = Router()
//@ts-ignore
router.post('/share',VerifyJwt,ShareLink)
//@ts-ignore
router.get('/share/:ShareId',VerifyJwt,ShareContent)

export default router;