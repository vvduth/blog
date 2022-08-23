import { getAllPosts, getOnePostById, sendLikes, getAllComments } from "../controllers/postController";
import { protect } from "../middlewares/authMiddlewares";
import express from 'express'

const router = express.Router() ;

router.route('/allposts').get(getAllPosts)
router.route('/:pid').get(getOnePostById) ;
router.route('/:pid/like').put(protect, sendLikes)
router.route('/:pid/comments').get(getAllComments) ;

export default router