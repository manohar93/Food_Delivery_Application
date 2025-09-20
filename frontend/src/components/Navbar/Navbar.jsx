import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from './../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from './../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const explore = document.getElementById('explore-menu');
    const download = document.getElementById('app-download');
    const footer = document.getElementById('footer');

    if (footer && scrollY >= footer.offsetTop - 100) {
      setMenu('contact-us');
    } else if (download && scrollY >= download.offsetTop - 100) {
      setMenu('download-app');
    } else if (explore && scrollY >= explore.offsetTop - 100) {
      setMenu('menu');
    } else {
      setMenu('home');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (menuItem) => {
    setMenu(menuItem);
  };

  return (
    <div className="navbar" id="home">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          className={`menu-item home ${menu === 'home' ? 'active' : ''}`}
          onClick={() => handleMenuClick('home')}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          className={`menu-item menu ${menu === 'menu' ? 'active' : ''}`}
          onClick={() => handleMenuClick('menu')}
        >
          menu
        </a>
        <a
          href="#app-download"
          className={`menu-item download ${menu === 'download-app' ? 'active' : ''}`}
          onClick={() => handleMenuClick('download-app')}
        >
          download app
        </a>
        <a
          href="#footer"
          className={`menu-item contact ${menu === 'contact-us' ? 'active' : ''}`}
          onClick={() => handleMenuClick('contact-us')}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <img src={assets.search_icon} alt="Search" onClick={handleSearch} />
        </div>

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.cart} alt="Cart" />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.user} alt="Profile" className="profile-icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
