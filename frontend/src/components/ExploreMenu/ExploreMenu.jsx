import React, { useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < menu_list.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const visibleItems = menu_list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>
        Delicious variety of mouth-watering categories like Pizza, Thali, Non-Veg, Noodles... 
        there is something tasty waiting for everyone’s appetite!
      </p>

      <div className="carousel-controls">
        <button onClick={handlePrev} disabled={startIndex === 0}>‹</button>
        <div className="explore-menu-list">
          {visibleItems.map((item, index) => (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
              key={index}
              className="explore-menu-list-item"
            >
              <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <button onClick={handleNext} disabled={startIndex + itemsPerPage >= menu_list.length}>›</button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;
