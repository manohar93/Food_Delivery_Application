import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h1>TastyTreats</h1>
                <p></p>
                <h2>Follow us on</h2>
                <div className="footer-social-icons">
                   <div className="footer-social-icons">
                   <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                     <img src={assets.facebook_icon} alt="Facebook" />
                   </a>
                   
                   <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                     <img src={assets.twitter_icon} alt="Twitter" />
                   </a>
  
                   <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                     <img src={assets.linkedin_icon} alt="LinkedIn" />
                   </a>
                 </div>

                </div>
            </div>
            <div className="footer-content-center">
                <h2>Quick Links</h2>
                <ul>
                   <ul>
                     <li><a href="#home">Home</a></li>
                     <li><a href="#explore-menu">Menu</a></li>
                     <li>About Us</li>
                     <li>Privacy Policy</li>
                   </ul>

                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Contact Us</h2>
                <ul>
                    <li>+91 3248965710</li>
                    <li>tastytreats0007@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 &copy; <strong>TastyTreats</strong> - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer