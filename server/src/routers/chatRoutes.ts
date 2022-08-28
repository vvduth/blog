import { getAllConversation } from "../controllers/chatController";
import { protect } from "../middlewares/authMiddlewares";
import express from 'express'

const router = express.Router()

router.route('/allconvos').get(protect, getAllConversation)

export default router