import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from 'axios';
import { toast } from "react-toastify";
import HeaderS from "../components/HeaderS";
import UserContext from '../pages/UserContext';
import useProductActions from "./products";

function Homepage() {
  const products = useContext(UserContext);
  const user_id = localStorage.getItem("user_id");
  const [clickedHearts, setClickedHearts] = useState({});
  const {
    addToCart,
    showCartAd,
    setShowCartAd,
    showWishlistAd,
    setShowWishlistAd
  } = useProductActions();

  // 🔁 Fetch wishlist data on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user_id || user_id === "null") return;

      const formData = new FormData();
      formData.append("user_id", user_id);

      try {
        const res = await axios.post("http://localhost:8000/get-wishlist.php", formData);
        if (res.data.status === "success") {
          const wishlist = res.data.products || res.data.data || [];
          const initialHearts = {};
          wishlist.forEach(item => {
            initialHearts[item.product_id] = true;
          });
          setClickedHearts(initialHearts);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user_id]);

  return (
    <div className="homepage">
           {/* ✅ Carousel */}
      <div className="carousel">
        <Carousel>
          <Carousel.Item>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2025/GW/UBS/March/Unrec/Holi/PC/pc_1._CB549343394_.jpg" alt="Slide 1" className="w-100 h-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/GW/P42/Boult_3000x1200-PC._CB543542644_.jpg" alt="Slide 2" className="w-100 h-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Beauty/QC/hero/Updated/Lipsticks_PC_1._CB549241553_.png" alt="Slide 3" className="w-100 h-100" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* ✅ Products List */}
      <div className="homepage-boxes">
         <div className="homepage-boxes">
                 <div className="homepage-box">
                     <div className="homepage-header">
                         <h3>Appliances for your home | Up to 55% off</h3>
                     </div>
                     <div className="Outer-homepage-box">
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Air conditioners</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Refrigerators</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Microwaves</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Washing machines</p>
                         </div>
                     </div>
                 </div>
                 <div className="homepage-box">
                     <div className="homepage-header">
                         <h3>Revamp your home in style</h3>
                     </div>
                     <div className="Outer-homepage-box">
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_furnishings_2._SY232_CB555629502_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Cushion covers, bedsheets & more</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_decor_1._SY232_CB555629502_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Figurines, vases & more</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_storage_1._SY232_CB555629502_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Home storage</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/New/2x/372x232_Home_lighting_2_-_Copy._SY232_CB555629502_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Lighting solutions</p>
                         </div>
                     </div>
                 </div>
                 <div className="homepage-box">
                     <div className="homepage-header">
                         <h3>Starting ₹149 | Headphones</h3>
                     </div>
                     <div className="Outer-homepage-box">
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_boAt._SY232_CB553870684_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Starting ₹249 | boAt</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Boult._SY232_CB553870684_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Starting ₹349 | boult</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Noise._SY232_CB553870684_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Starting ₹649 | Noise</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/MSO/PD3/PC_QuadCard_Zeb_1._SY232_CB570220221_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Starting ₹149 | Zebronics</p>
                         </div>
                     </div>
                 </div>
                 <div className="homepage-box">
                     <div className="homepage-header">
                         <h3>Starting ₹199 | Amazon Brands & more</h3>
                     </div>
                     <div className="Outer-homepage-box">
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_SIZE_372_2._SY232_CB567468220_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Starting ₹199 | Bedsheets</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_SIZE_372_3._SY232_CB567468220_.jpg" alt="image.jpg" className="product-images"></img>
                           <p>Starting ₹199 | Curtains</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_SIZE_372_4._SY232_CB567468220_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Minimum 40% off | Ironing board & more</p>
                         </div>
                         <div className="Inner-homepage-box">
                             <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_SIZE_372_1._SY232_CB567468220_.jpg" alt="image.jpg" className="product-images"></img>
                             <p>Up to 60% off | Home decor</p>
                         </div>
                     </div>
                 </div>
             </div>
       </div>
      {products && (
        <div className="container mt-4">
          <h2>Product List</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-3 deckcard" key={product.product_id}>
                <div className="card position-relative h-100 d-flex flex-column">
                  <img src={product.images} className="card-img-top" alt={product.name} style={{ height: "250px", objectFit: "contain" }} />

                  {/* ❤️ Wishlist Toggle */}
                  <FavoriteIcon
                    onClick={async () => {
                      if (!user_id || user_id === "null") {
                        toast.warning("Please log in to manage wishlist");
                        window.location.href = "/login";
                        return;
                      }

                      const data = new FormData();
                      data.append("user_id", user_id);
                      data.append("product_id", product.product_id);

                      try {
                        if (clickedHearts[product.product_id]) {
                          const res = await axios.post("http://localhost:8000/remove-wishlist.php", data);
                          if (res.data.status === "success") {
                            setClickedHearts((prev) => ({ ...prev, [product.product_id]: false }));
                            toast.success("Removed from wishlist");
                          } else {
                            toast.error("Failed to remove item");
                          }
                        } else {
                          const res = await axios.post("http://localhost:8000/Insert_wishlist_item.php", data);
                          if (res.data.status === "success" || res.data.status === "exists") {
                            setClickedHearts((prev) => ({ ...prev, [product.product_id]: true }));
                            toast.success("Added to wishlist");
                          } else {
                            toast.error("Failed to add item");
                          }
                        }
                      } catch (err) {
                        console.error("Wishlist toggle error:", err);
                        toast.error("Server error");
                      }

                      setShowWishlistAd(true);
                      setTimeout(() => setShowWishlistAd(false), 2000);
                    }}
                    style={{
                      color: clickedHearts[product.product_id] ? "red" : "gray",
                      cursor: "pointer",
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title clamp-2-lines" title={product.name}>{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Price: ₹{product.price}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <Link to={`/item-details/${product.product_id}`} className="btn btn-primary">View</Link>
                     <Link to={`/Buynow/${product.product_id}`} className="btn btn-warning me-2"> Buy Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Wishlist Toast */}
          {showWishlistAd && (
            <div style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px 20px",
              borderRadius: "6px",
              zIndex: 9999,
              fontWeight: "bold"
            }}>
              Wishlist updated!
            </div>
          )}

          {/* ✅ Cart Toast */}
          {showCartAd && (
            <div style={{
              position: "fixed",
              top: "60px",
              right: "10px",
              backgroundColor: "#ffc107",
              color: "black",
              padding: "12px 20px",
              borderRadius: "6px",
              zIndex: 9999,
              fontWeight: "bold"
            }}>
              Added to cart!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;
