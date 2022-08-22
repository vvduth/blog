import { protect } from './../middlewares/authMiddlewares';


import express from 'express'
import { getUserProfile,registerUser, authUser } from '../controllers/userController'
const router = express.Router()

router.route('/register').post(registerUser) ;
router.route('/login').post(  authUser);
router.route('/profile').put(protect, getUserProfile)



export default router