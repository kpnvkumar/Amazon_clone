import { useEffect, useState } from "react";
import axios from "axios";
import useProductActions from "../pages/products";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";
function Toysandgames() {
  const [products, setProducts] = useState([]);
  const [clickedHearts, setClickedHearts] = useState({});
  const [showCartAd, setShowCartAd] = useState(false);
  const [showWishlistAd, setShowWishlistAd] = useState(false);
  const [wishlistActionText, setWishlistActionText] = useState("");
  const user_id = localStorage.getItem("user_id");
  const notify = (msg, type = "info") => {
    toast.dismiss();
    toast(msg, { type, autoClose: 3000 });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/Homeimprove.php");
        if (res.data.status === "success") {
          setProducts(res.data.products);
        } else {
          console.warn("No products found or status not success");
        }
      } catch (error) {
        console.error("Failed to fetch MX Player products:", error);
      }
    };

    fetchProducts();
  }, []);
    const refreshWishlist = async () => {
    if (!user_id || user_id === "null") return;
    try {
      const res = await axios.get(`http://localhost:8000/get-wishlist.php?user_id=${user_id}`);
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        const wishlistMap = {};
        res.data.data.forEach(item => {
          wishlistMap[item.product_id] = true;
        });
        setClickedHearts(wishlistMap);
      }
    } catch (error) {
      console.error("Failed to refresh wishlist:", error);
    }
  };
  useEffect(() => {
    refreshWishlist();
  }, [user_id]);
  const addToWishlist = async (product_id) => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("product_id", product_id);
    try {
      const res = await axios.post("http://localhost:8000/Insert_wishlist_item.php", data);
      if (res.data.status === "success") {
        setClickedHearts(prev => ({ ...prev, [product_id]: true }));
        setWishlistActionText("Added to wishlist!");
        setShowWishlistAd(true);
        notify("Added to wishlist!", "success");
      } else if (res.data.status === "exists") {
        setWishlistActionText("Already in wishlist");
        setShowWishlistAd(true);
        notify("Already in wishlist", "info");
      } else {
        notify("Failed: " + res.data.message, "error");
      }
    } catch {
      notify("Error adding to wishlist", "error");
    }
  };
  const removeFromWishlist = async (product_id) => {
     console.log("Calling removeFromWishlist for", product_id);
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("product_id", product_id);
    try {
      const res = await axios.post("http://localhost:8000/remove-wishlist.php", data);
      console.log("Delete response:", res.data);
      if (res.data.status === "success") {
        setClickedHearts(prev => ({ ...prev, [product_id]: false }));
        setWishlistActionText("Removed from wishlist");
        setShowWishlistAd(true);
        notify("Removed from wishlist", "info");
      } else {
        notify("Failed to remove: " + res.data.message, "error");
      }
    } catch(err) {
       console.error("Error removing from wishlist", err);
      notify("Error removing from wishlist", "error");
    }
  };
  const toggleWishlist = async (product_id) => {
    console.log("Toggle clicked for:", product_id);
    if (!user_id || user_id === "null") {
      notify("Please log in to manage wishlist", "warning");
      window.location.href = "/login";
      return;
    }
    if (clickedHearts[product_id]) {
      console.log("Removing from wishlist...");
      await removeFromWishlist(product_id);
    } else {
      console.log("Adding to wishlist...");
      await addToWishlist(product_id);
    }
    await refreshWishlist(); // ✅ Ensure up-to-date state after toggle
  };
  const addToCart = async (product_id) => {
    if (!user_id || user_id === "null") {
      notify("Please log in to add to cart", "warning");
      window.location.href = "/login";
      return;
    }
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("product_id", product_id);
    data.append("quantity", 1);
    try {
      const res = await axios.post("http://localhost:8000/insert-cart.php", data);
      if (res.data.status === "success") {
        setShowCartAd(true);
        notify("Item added to cart", "success");
      } else {
        notify("Failed: " + res.data.message, "error");
      }
    } catch {
      notify("Error adding to cart", "error");
    }
  };

  return (
<div className="container mt-4">
          <h2>Product List</h2>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-3 deckcard" key={product.product_id}>
                <div className="card position-relative h-100 d-flex flex-column">
                  <img src={product.images} className="card-img-top" alt={product.name} style={{ height: "250px", objectFit: "contain" }} />

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

          {/* ✅ Wishlist Ad */}
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
              Added to wishlist!
            </div>
          )}

          {/* ✅ Cart Ad */}
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
  );
}

export default Toysandgames;