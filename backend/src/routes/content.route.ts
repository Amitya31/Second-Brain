import { Router } from "express"; 
import { CreateContent } from "../Controllers/content.controller";
import VerifyJwt from "../middleware/auth.middleware";

const router = Router();
// @ts-ignore
router.post('/content',VerifyJwt,CreateContent)

export default router