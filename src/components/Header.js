import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import cart from '../images/cart.png';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("sign in");

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const storedName = localStorage.getItem('name');
    if (userId && userId !== "null") {
      setIsLoggedIn(true);
      setName(storedName || "User");
    } else {
      setIsLoggedIn(false);
      setName("sign in");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    window.location.href = '/login';
  };

  return (
    <div className="header">
      <div className="primary-navbar">
        {/* Logo */}
        <div className="logo-container">
          <a href="/"><img src={logo} alt="logo" className="logo" /></a>
        </div>

        {/* Address */}
        <div className="address-container">
          <p className="delivery-text">Delivery to Hyderabad, 500555</p>
          <p className="update-address">Update Address</p>
        </div>

        {/* Search */}
        <div className="search-container">
          <input type="text" placeholder="Search Amazon.in" className="search-bar" />
          <button className="btn btn-warning rounded-end-3 rounded-start-0">
            <SearchIcon />
          </button>
        </div>

        {/* Account */}
        <a href={isLoggedIn ? "/accounts" : "/login"}>
          <div className="account-container">
            <p className="greeting">Hello, {name}</p>
            <p className="account-link">Accounts & Lists</p>
          </div>
        </a>

        {/* Orders */}
        <a href="/orders" className="orders-container" style={{ textDecoration: "none" }}>
        <p className="returns">Returns</p>
        <p className="orders">& Orders</p>
      </a>

        {/* Cart */}
        <div className="cart-container">
          <a href="/cart"><img src={cart} alt="cart" className="cart-icon" /></a>
          <p className="cart">Cart</p>
        </div>

        {/* Login/Signup or Wishlist/Logout */}
        <div className="auth-buttons d-flex align-items-center ms-3">
          {isLoggedIn ? (
            <>
              <a href="/wishlist" className="btn btn-success me-2">Wishlist</a>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="btn btn-warning me-2">Login</a>
              <a href="/signup" className="btn btn-primary">Signup</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
