import React, { useEffect, useState } from "react";

export default function Payments() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/get-orders.php");
      const data = await res.json();
      
      console.log("API Response:", data);
      
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Network error: Unable to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (transactionId, status) => {
    try {
      const res = await fetch(
        `http://localhost:8000/update_status.php?transactionId=${encodeURIComponent(transactionId)}&status=${encodeURIComponent(status)}`
      );
      const data = await res.json();
      
      console.log("Update response:", data);
      
      if (data.success) {
        fetchOrders();
      } else {
        alert(`Failed to update status: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating status: " + err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Get all column names from the first order
  const columns = orders.length > 0 ? Object.keys(orders[0]) : [];

  const filtered = orders.filter((o) => {
    const searchLower = search.toLowerCase();
    return Object.values(o).some(value => 
      String(value).toLowerCase().includes(searchLower)
    );
  });

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <h1 style={{ marginBottom: "20px" }}>Orders & Payments</h1>
      {loading && <p style={{ color: "#666" }}>Loading orders...</p>}
      
      {error && (
        <div style={{ 
          padding: "15px", 
          background: "#fee", 
          border: "1px solid #fcc",
          borderRadius: "4px",
          marginBottom: "20px",
          color: "#c33"
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p style={{ color: "#666", fontSize: "16px" }}>No orders found</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                {columns.map((col) => (
                  <th key={col} style={thStyle}>
                    {col.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                  </th>
                ))}
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, idx) => (
                <tr key={idx} style={{
                  borderBottom: "1px solid #ddd"
                }}>
                  {columns.map((col) => (
                    <td key={col} style={tdStyle}>
                      {col === 'price' || col === 'amount' 
                        ? `₹${order[col]}` 
                        : order[col] || "-"}
                    </td>
                  ))}
                  <td style={tdStyle}>
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(
                          order.transactionId,
                          e.target.value
                        )
                      }
                      style={{
                        padding: "6px 10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "13px",
                        cursor: "pointer"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "14px",
  color: "#495057",
  borderBottom: "2px solid #dee2e6",
  whiteSpace: "nowrap"
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#212529"
};