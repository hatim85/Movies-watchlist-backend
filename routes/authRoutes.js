import express from 'express'
import { signup,signin, signout } from '../controllers/authController.js'

const router=express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.delete('/signout',signout);

export default router;