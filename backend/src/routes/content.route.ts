import { Router } from "express"; 
import { CreateContent,deleteContent,getContent } from "../Controllers/content.controller";
import VerifyJwt from "../middleware/auth.middleware";

const router = Router();
// @ts-ignore
router.post('/content',VerifyJwt,CreateContent)
//@ts-ignore
router.get('/content',VerifyJwt , getContent)
//@ts-ignore
router.post('/content/:id',VerifyJwt,deleteContent)
export default router