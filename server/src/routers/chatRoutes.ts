import { getAllConversation, getAllChannels } from "../controllers/chatController";
import { protect } from "../middlewares/authMiddlewares";
import express from 'express'

const router = express.Router()

router.route('/allconvos').get(protect, getAllConversation)
router.route('/allChannels').get(protect, getAllChannels)

export default router