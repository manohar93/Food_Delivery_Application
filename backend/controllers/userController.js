import svgCaptcha from 'svg-captcha';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

let captchaText = ''; // holds the current captcha text

// Generate or refresh CAPTCHA
const generateCaptcha = () => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 2,
    color: true,
    height: 50,
    width: 150,
  });
  captchaText = captcha.text;      // store for validation
  return captcha.data;             // svg string
};

// Create JWT
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// LOGIN
const loginUser = async (req, res) => {
  const { email, password, captchaInput } = req.body;

  // 1️⃣ CAPTCHA validation
  if (!captchaInput || captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
    // Invalidate old captcha
    captchaText = '';
    return res.json({ success: false, message: 'Invalid captcha' });
  }
  // Invalidate once used
  captchaText = '';

  try {
    // 2️⃣ User existence
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    // 3️⃣ Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // 4️⃣ Issue token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error' });
  }
};

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password, captchaInput } = req.body;

  // 1️⃣ CAPTCHA validation
  if (!captchaInput || captchaInput.toLowerCase() !== captchaText.toLowerCase()) {
    captchaText = '';
    return res.json({ success: false, message: 'Invalid captcha' });
  }
  captchaText = '';

  try {
    // 2️⃣ Check existing
    if (await userModel.findOne({ email })) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // 3️⃣ Validate inputs
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please enter a valid email' });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: 'Please enter a strong password' });
    }

    // 4️⃣ Hash & save
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashed });
    const user = await newUser.save();

    // 5️⃣ Issue token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error' });
  }
};

export { generateCaptcha, loginUser, registerUser };
