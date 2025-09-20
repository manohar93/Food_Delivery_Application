import React, { useContext, useState, useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    captchaInput: ''
  });
  const [captchaImage, setCaptchaImage] = useState('');

  // Disable scroll on popup open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Fetch CAPTCHA on initial load and on toggle
  useEffect(() => {
    fetchCaptcha();
  }, [currentState]);

  const fetchCaptcha = async () => {
    try {
      const res = await axios.get(`${url}/api/user/captcha`);
      setCaptchaImage(res.data.captcha);
      setData(prev => ({ ...prev, captchaInput: '' }));
    } catch (error) {
      console.error('Error fetching CAPTCHA:', error);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const endpoint = currentState === 'Login' ? 'login' : 'register';

    try {
      const res = await axios.post(`${url}/api/user/${endpoint}`, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
        if (res.data.message.toLowerCase().includes('captcha')) {
          fetchCaptcha();
        }
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
      fetchCaptcha();
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currentState === 'Sign Up' && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />

          <div className="captcha-container">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(captchaImage)}`}
              alt="captcha"
              className="captcha-image"
            />
            <button
              type="button"
              onClick={fetchCaptcha}
              className="refresh-captcha-button"
            >
              ↻
            </button>
          </div>

          <input
            name="captchaInput"
            type="text"
            placeholder="Enter CAPTCHA"
            value={data.captchaInput}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        <p>
          {currentState === 'Login' ? (
            <>
              Create a new account?{' '}
              <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span onClick={() => setCurrentState('Login')}>Login here</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
