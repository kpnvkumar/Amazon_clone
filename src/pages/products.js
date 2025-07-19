import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function useProductActions() {
  const [clickedHearts, setClickedHearts] = useState({});
  const [showCartAd, setShowCartAd] = useState(false);
  const [showWishlistAd, setShowWishlistAd] = useState(false);
  const [wishlistActionText, setWishlistActionText] = useState("");
  const user_id = localStorage.getItem("user_id");
  const notify = (msg, type = "info") => {
    toast.dismiss();
    toast(msg, { type, autoClose: 3000 });
  };
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
  const addToCart = async (product_id) => {
    if (!user_id || user_id === "null") {
      notify("Please log in to add to cart", "warning");
      window.location.href = "/login";
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
  return {
    addToCart,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    refreshWishlist,
    clickedHearts,
    showCartAd,
    setShowCartAd,
    showWishlistAd,
    setShowWishlistAd,
    wishlistActionText,
    setWishlistActionText,
  };
}
