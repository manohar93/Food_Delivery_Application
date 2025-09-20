import React from 'react'
import './AppDownlaod.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience download our <br/>TastyTreats App</p>
        <div className="app-download-platforms">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
            <img src={assets.play_store} alt="Get it on Google Play" />
          </a>

          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <img src={assets.app_store} alt="Download on the App Store" />
          </a>
        </div>
    </div>
  )
}

export default AppDownload