import React from 'react'
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Homeimprovements from '../pages/Homeimprovements';
function HeaderS() {
  return (
    <div className='header' style={{ marginBottom: 0, paddingBottom: 0 }}>
      <div className="secondary-navbar" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="header-menu">
          <MenuIcon />
          <a href="/"><p className="content">All</p></a>
        </div>
     <Link to="/mxplayer"><p className="content">MX Player</p></Link>
      <Link to="/Homeimprovements"><p className="content">Home improvements</p></Link>
      <Link to="/Toysandgames"><p className="content">Toys and games</p></Link>
      <Link to="/Mobiles"><p className="content">Mobiles</p></Link>
      <Link to="/Fashion"><p className="content">Fashion</p></Link>
      <Link to="/Homeandkitchen"><p className="content">Home&kitchen</p></Link>
        <Link to="/Electronics"><p className='content'>Electronics</p></Link>
        <Link to="/Books"><p className="content">Books</p></Link>
        <Link to="/Bikes"><p className="content">Bikes and cars</p></Link>
        <img className="adv" src="https://m.media-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/March2025/Gladiator2/400x39-SWM_Final_NP._CB549298932_.jpg" alt="ss" />
      </div>
    </div>
  )
}

export default HeaderS
