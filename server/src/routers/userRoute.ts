import { protect } from './../middlewares/authMiddlewares';


import express from 'express'
import { registerUser, authUser } from '../controllers/userController'
const router = express.Router()

router.route('/register').post(registerUser) ;
router.route('/login').post( protect, authUser)



export default router