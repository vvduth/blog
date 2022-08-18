import { getAllPosts } from "../controllers/postController";

import express from 'express'

const router = express.Router() ;

router.route('/allposts').get(getAllPosts)

export default router