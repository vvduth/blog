
import { getAllPosts, getOnePostById, sendLikes, getAllComments, postComments } from "../controllers/postController";
import { protect } from "../middlewares/authMiddlewares";
import express from 'express'

const router = express.Router() ;

router.route('/allposts').get(getAllPosts)
router.route('/:pid').get(getOnePostById) ;
router.route('/:pid/like').put(protect, sendLikes)
router.route('/:pid/comments').get(getAllComments).post(protect, postComments) ;

export default router