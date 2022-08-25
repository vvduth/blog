import { getAllUsers } from './../controllers/userController';
import { protect, admin } from './../middlewares/authMiddlewares';


import express from 'express'
import { getUserProfile,registerUser, authUser } from '../controllers/userController'
const router = express.Router()

router.route('/register').post(registerUser) ;
router.route('/login').post(  authUser);
router.route('/profile').get(protect, getUserProfile)
router.route('/getAllUser').get(protect,admin, getAllUsers) ;



export default router