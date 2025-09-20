import express from 'express'
import { loginUser, registerUser,generateCaptcha } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/captcha', (req, res) => {
  const captcha = generateCaptcha(); // Generate the CAPTCHA image
  res.json({ captcha }); // Send the CAPTCHA SVG image
});


userRouter.get('/refresh-captcha', (req, res) => {
  const captcha = generateCaptcha(); // Generate a new CAPTCHA image
  res.json({ captcha }); // Send the refreshed CAPTCHA image
});
export default userRouter;
