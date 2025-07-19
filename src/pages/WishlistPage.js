import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useProductActions from "./products";
import { toast } from "react-toastify";
function WishlistPage() {
  const userId = localStorage.getItem("user_id");
  const [items, setItems] = useState([]);
  const [clickedHearts, setClickedHearts] = useState({}); // ✅ Track heart icon state

  const {
    addToCart,
    showCartAd,
    setShowCartAd
  } = useProductActions();

  const FetchData = async () => {
    const data = new FormData();
    try {
      const response = await axios.post(
        `http://localhost:8000/get-wishlist.php?user_id=${userId}`,
        data,
        { headers: { "content-type": "multipart/form-data" } }
      );
      if (response.data?.status === "success") {
        setItems(response.data.data);

        // ✅ Initialize heart icon state
        const heartState = {};
        response.data.data.forEach(item => {
          heartState[item.product_id] = true;
        });
        setClickedHearts(heartState);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  useEffect(() => {
    if (!userId) {
      alert("Please login to access wishlist");
      window.location.href = "/login";
      return;
    }
    FetchData();
  }, []);

  // ✅ Remove from wishlist handler
const removeFromWishlist = async (product_id) => {

  const userId = localStorage.getItem("user_id");
  const notify = (msg, type = "info") => {
      toast.dismiss();
      toast(msg, { type, autoClose: 3000 });
    };
  if (!userId) {
    alert("Please log in to remove item from wishlist");
    return;
  }
    const data = new FormData();
    data.append("user_id", userId);
    data.append("product_id", product_id);

    try {
      const res = await axios.post("http://localhost:8000/remove-wishlist.php", data);
      if (res.data.status === "success") {
        setClickedHearts(prev => ({ ...prev, [product_id]: false }));
        setItems(prev => prev.filter(item => item.product_id !== product_id));
        // alert("Removed from wishlist");
        notify("Item removed from wishlist", "success");
        window.location.replace('/wishlist')
      } else {
        alert("Failed to remove item");
      }
    } catch (err) {
      console.error("Remove error:", err);
      alert("Server error");
    }
  };

  if (!items || items.length === 0) {
    return <p className="text-center mt-4">Your wishlist is empty.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Wishlist</h2>
      <div className="row">
        {items.map((item) => (
          <div key={item.product_id} className="col-md-4 mb-3">
            <div className="card h-100 position-relative">
              <img
                src={item.image_url}
                alt={item.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "contain" }}
              />
              <FavoriteIcon
                onClick={() => removeFromWishlist(item.product_id)}
                style={{
                  color: clickedHearts[item.product_id] ? "red" : "gray",
                  cursor: "pointer",
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">Price: ₹{item.price}</p>
                <p className="card-text">Rating: {item.rating ?? "N/A"} ⭐</p>
                <div className="mt-auto d-flex justify-content-between">
                  <Link to={`/item-details/${item.product_id}`} className="btn btn-primary">
                    View
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      addToCart(item.product_id);
                      setShowCartAd(true);
                      setTimeout(() => setShowCartAd(false), 5000);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Cart Ad Notification */}
      {showCartAd && (
        <div style={{
          position: "fixed",
          top: "10px",
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
  );
}

export default WishlistPage;
