import { getAllPosts, getOnePostById } from "../controllers/postController";

import express from 'express'

const router = express.Router() ;

router.route('/allposts').get(getAllPosts)
router.route('/:pid').get(getOnePostById) ;

export default router