import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate  } from 'react-router-dom';
import useProductActions from './products';
import Buynow  from "./Buynow";
import { Link } from 'react-router-dom';
function ItemDetails() {
  const { product_id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCartAd, setShowCartAd] = useState(false);
  const navigate = useNavigate();
   const {
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clickedHearts,
    showWishlistAd,
    setShowWishlistAd,
    wishlistActionText,
  } = useProductActions();

  const fetchData = async () => {
    const data = new FormData();
    data.append("product_id", product_id);

    try {
      const response = await axios.post(
        "http://localhost:8000/get-product-details.php",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response?.data?.product_data) setDetails(response.data.product_data);
      else alert("Product not found.");
    } catch (err) {
      console.error("Error fetching product details:", err);
      alert("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id || user_id === "null") {
      window.location.href = "/login";
      return;
    }

    const data = new FormData();
    data.append("user_id", user_id);
    data.append("product_id", product_id);
    data.append("quantity", 1);

    try {
      const response = await axios.post(
        "http://localhost:8000/insert-cart.php",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response?.data?.status === "success") setShowCartAd(true);
    } catch (error) {
      console.error("AddToCart error:", error);
      alert("Error adding item to cart.");
    }
  };

  useEffect(() => {
    if (showCartAd) {
      const timer = setTimeout(() => setShowCartAd(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showCartAd]);

  useEffect(() => {
    fetchData();
  }, [product_id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!details) return <p className="text-center mt-4">No product details available.</p>;

  return (
    <div className="container mt-5">
           {showWishlistAd && (
        <div style={{
          position: "fixed", top: "60px", right: "10px",
          backgroundColor: wishlistActionText.includes("Removed") ? "#dc3545" : "#28a745",
          color: "white", padding: "12px 20px", borderRadius: "6px", zIndex: 9999
        }}>
          {wishlistActionText}
        </div>
      )}

      <div className="row d-flex align-items-start">
        <div className="col-md-5">
          <img src={details.images} alt={details.name} className="img-fluid border"
            style={{ maxHeight: "400px", objectFit: "contain" }} />
        </div>
        <div className="col-md-7">
          
          <div className="container mt-4">
  <div className="card position-relative p-3">
    <div className="d-flex flex-column flex-md-row align-items-center">
      <div className="ms-md-4 mt-3 mt-md-0 flex-grow-1">
        <h3 className="card-title">{details.name}</h3>
        <p className="card-text">{details.description}</p>
        <p className="card-text">Price: ₹{details.price}</p>

        <div className="mt-3 d-flex flex-wrap align-items-center">
          <button className="btn btn-warning me-2" onClick={() => {
            addToCart(details.product_id);
            setShowCartAd(true);
            setTimeout(() => setShowCartAd(false), 5000);
            
          }}>
            Add to Cart
          </button>
          <button
  className={`btn ${clickedHearts[details.product_id] ? 'btn-danger' : 'btn-outline-danger'} me-2`}
  onClick={() => {
    toggleWishlist(details.product_id);
    setShowWishlistAd(true);
    setTimeout(() => setShowWishlistAd(false), 5000);
  }}
>
  {clickedHearts[details.product_id] ? "Remove from Wishlist" : "Add to Wishlist"}
</button>
          <Link to={`/Buynow/${details.product_id}`} className="btn btn-primary me-2"> Buy Now</Link>
        </div>
      </div>
    </div>
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
</div>
        </div>
      </div>
    </div>
  );
}
export default ItemDetails;