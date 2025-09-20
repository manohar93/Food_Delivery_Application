import React from 'react'
import Slider from 'react-slick'
import './Header.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import header_img from '../../assets/header_img.png'
import header_img1 from '../../assets/header_img1.png'
import header_img2 from '../../assets/header_img2.png'
import header_img3 from '../../assets/header_img3.png'

const Header = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    swipe: true,
    cssEase: 'ease-in-out',
  }

  return (
    <div className="header">
      <Slider {...settings} className="header-carousel">
        <div><img src={header_img} alt="Dish 1" /></div>
        <div><img src={header_img1} alt="Dish 2" /></div>
        <div><img src={header_img2} alt="Dish 3" /></div>
        <div><img src={header_img3} alt="Dish 4" /></div>
      </Slider>

      <div className="header-overlay">
        <div className="header-contents">
          <h2>Delicious Meals Delivered to Your Doorstep</h2>
          <h4>
            Craving something tasty? Browse our menu packed with fresh, flavorful dishes and get your
            favorite meals delivered fast, hot, and hassle-free — right when you need them.
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Header
