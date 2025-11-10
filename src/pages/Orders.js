import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const user_id = localStorage.getItem("user_id");

  const fetchUserOrders = async () => {
    if (!user_id) {
      setError("Please login to view your orders");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8000/get-user-orders.php?user_id=${user_id}`);
      const data = await res.json();

      console.log("Orders Response:", data);

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to fetch orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated cancel order function (uses product_id as order_id)
  const handleCancelOrder = async (orderIdParam) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    setCancellingOrderId(orderIdParam);

    const orderToCancel = orders.find(
      (o) => (o.transactionId || o.transaction_id) === orderIdParam
    );

    if (!orderToCancel) {
      alert("Order not found. Please refresh and try again.");
      setCancellingOrderId(null);
      return;
    }

    // Use product_id as order_id (backend expects order_id)
    const order_id = orderToCancel.product_id;

    try {
      const res = await fetch(
        `http://localhost:8000/delete-order.php?order_id=${order_id}`,
        { method: "GET" }
      );

      const data = await res.json();

      if (data.status === "success") {
        alert("Order cancelled successfully!");
        fetchUserOrders(); // Refresh orders
      } else {
        alert("Failed to cancel order");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Unable to cancel order. Please try again.");
    } finally {
      setCancellingOrderId(null);
    }
  };

  const canCancelOrder = (status) => {
    const statusLower = status?.toLowerCase();
    return (
      statusLower === "pending" ||
      statusLower === "shipped" ||
      statusLower === "shipping"
    );
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "delivered":
        return "#28a745";
      case "shipped":
      case "shipping":
        return "#007bff";
      case "pending":
        return "#ffc107";
      case "cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (!user_id) {
    return (
      <div className="user-orders-container">
        <div className="empty-state">
          <h2>Please Login</h2>
          <p>You need to login to view your orders</p>
          <a href="/login" className="login-btn">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{ fontSize: "32px", fontWeight: "bold", margin: "0 0 8px 0" }}
          >
            My Orders
          </h1>
          <p style={{ color: "#666", margin: "0 0 16px 0" }}>
            Track and manage your purchases
          </p>
          <button
            onClick={fetchUserOrders}
            style={{
              padding: "10px 20px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🔄 Refresh
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            ></div>
            <p>Loading your orders...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: "16px",
              backgroundColor: "#fee",
              border: "1px solid #fcc",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Empty Orders */}
        {!loading && !error && orders.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet. Start shopping!</p>
            <a
              href="/"
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "10px 24px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              Continue Shopping
            </a>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div style={{ display: "grid", gap: "20px" }}>
            {orders.map((order, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {/* Order Header */}
                <div
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                      Order #{order.transactionId || order.transaction_id}
                    </h3>
                  </div>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div
                      style={{
                        background: getStatusColor(order.status),
                        padding: "6px 12px",
                        borderRadius: "12px",
                        color: "white",
                        fontWeight: "600",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      ⏰ {(order.status || "Pending").toUpperCase()}
                    </div>
                    {canCancelOrder(order.status) && (
                      <button
                        onClick={() =>
                          handleCancelOrder(order.transactionId || order.transaction_id)
                        }
                        disabled={
                          cancellingOrderId ===
                          (order.transactionId || order.transaction_id)
                        }
                        style={{
                          padding: "6px 12px",
                          backgroundColor:
                            cancellingOrderId ===
                            (order.transactionId || order.transaction_id)
                              ? "#ccc"
                              : "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor:
                            cancellingOrderId ===
                            (order.transactionId || order.transaction_id)
                              ? "not-allowed"
                              : "pointer",
                          fontSize: "12px",
                          fontWeight: "600",
                          transition: "background-color 0.2s",
                        }}
                      >
                        {cancellingOrderId ===
                        (order.transactionId || order.transaction_id)
                          ? "Cancelling..."
                          : "❌ Cancel Order"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div style={{ padding: "20px", display: "flex", gap: "30px" }}>
                  <div style={{ flex: "0 0 50%", maxWidth: "50%" }}>
                    {order.images && (
                      <img
                        src={order.images}
                        alt="Product"
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #e0e0e0",
                          backgroundColor: "#f9f9f9",
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      flex: "0 0 calc(50% - 30px)",
                      display: "grid",
                      gap: "16px",
                      alignContent: "start",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        Product ID
                      </div>
                      <div style={{ fontSize: "14px", color: "#666" }}>
                        {order.product_id}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        Quantity
                      </div>
                      <div style={{ fontSize: "14px" }}>{order.quantity}</div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        Price per item
                      </div>
                      <div style={{ fontSize: "14px" }}>₹{order.price}</div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        Total Amount
                      </div>
                      <div style={{ fontSize: "14px" }}>₹{order.amount}</div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          marginBottom: "8px",
                        }}
                      >
                        Delivery Address
                      </div>
                      <div
                        style={{
                          padding: "12px",
                          backgroundColor: "#f9f9f9",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                      >
                        {order.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
