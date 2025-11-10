import React, { useState, useEffect } from "react";
import {Users,Package,Home,ShoppingBag,Book,Gamepad2,Wrench,Bike,CreditCard,BarChart3,Menu,X,} from "lucide-react";
import axios from "axios";
//import "../index.css"; // or "./Admin.css" if you keep it separate
import Payments from "./Payments";  
const Admin = () => {
  const [selectedSlot, setSelectedSlot] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const menuItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Users", icon: Users },
    { name: "Mobiles", icon: Package },
    { name: "Electronics", icon: Package },
    { name: "Home & Kitchen", icon: Home },
    { name: "Fashion", icon: ShoppingBag },
    { name: "Books", icon: Book },
    { name: "Toys & Games", icon: Gamepad2 },
    { name: "Home Improvements", icon: Wrench },
    { name: "Bikes & Cars", icon: Bike },
    { name: "Payments", icon: CreditCard },
  ];

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/amazon-apis/get-orders.php",
        {},
        { headers: { "content-type": "multipart/form-data" } }
      );
      if (response.data && response.data.orders) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch orders when Payments tab is selected
  useEffect(() => {
    if (selectedSlot === "Payments") {
      fetchOrders();
    }
  }, [selectedSlot]);

  // Function to handle status change
  const handleStatusChange = async (transactionId, newStatus) => {
    try {
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("status", newStatus);

      const response = await axios.post(
        "http://localhost:8000/update-order-status.php",
        formData,
        { headers: { "content-type": "multipart/form-data" } }
      );

      if (response.data.success) {
        // Update local state only if backend update was successful
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.transactionId === transactionId
              ? { ...order, status: newStatus }
              : order
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  // Function to get badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "badge badge-yellow";
      case "Processing":
        return "badge badge-blue";
      case "Shipped":
        return "badge badge-purple";
      case "Delivered":
        return "badge badge-green";
      case "Cancelled":
        return "badge badge-red";
      default:
        return "badge";
    }
  };

  const renderContent = () => {
    switch (selectedSlot) {
      case "Dashboard":
        return (
          <div>
            <h1 className="page-title">Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card blue">
                <h3>Total Users</h3>
                <p className="stat-number">1,234</p>
                <p className="stat-note green">+12% from last month</p>
              </div>
              <div className="stat-card green">
                <h3>Total Orders</h3>
                <p className="stat-number">5,678</p>
                <p className="stat-note green">+8% from last month</p>
              </div>
              <div className="stat-card yellow">
                <h3>Total Products</h3>
                <p className="stat-number">892</p>
                <p className="stat-note blue">Updated today</p>
              </div>
              <div className="stat-card purple">
                <h3>Revenue</h3>
                <p className="stat-number">$45.2K</p>
                <p className="stat-note green">+18% from last month</p>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="content-box" style={{ marginTop: "2rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Recent Activity
              </h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div>
                    <p className="activity-text">New order #12345</p>
                    <p className="activity-time">2 minutes ago</p>
                  </div>
                  <span className="badge badge-green">New</span>
                </div>
                <div className="activity-item">
                  <div>
                    <p className="activity-text">User registration</p>
                    <p className="activity-time">15 minutes ago</p>
                  </div>
                  <span className="badge badge-blue">User</span>
                </div>
                <div className="activity-item">
                  <div>
                    <p className="activity-text">Product updated</p>
                    <p className="activity-time">1 hour ago</p>
                  </div>
                  <span className="badge badge-purple">Product</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "Payments":
        return <Payments/>;

      case "Users":
        return (
          <div>
            <h1 className="page-title">User Management</h1>
            <div className="content-box">
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="search-input"
                />
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <div className="user-avatar">U{i}</div>
                          <div>
                            <div style={{ fontWeight: "500" }}>User {i}</div>
                          </div>
                        </div>
                      </td>
                      <td>user{i}@example.com</td>
                      <td>
                        <span className="badge badge-green">Active</span>
                      </td>
                      <td>
                        <button className="action-btn btn-edit">Edit</button>
                        <button className="action-btn btn-delete">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="page-title">{selectedSlot}</h1>
            <div className="content-box">
              <p style={{ marginBottom: "1rem" }}>
                You selected <b style={{ color: "#2563eb" }}>{selectedSlot}</b>
                .
              </p>
              <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
                Here you can manage products, view analytics, and perform
                operations related to this category.
              </p>

              <div className="category-grid">
                <div className="category-card">
                  <h3>Add Products</h3>
                  <p>Add new products to this category</p>
                  <button className="btn btn-blue">Add New</button>
                </div>
                <div className="category-card">
                  <h3>View Products</h3>
                  <p>Browse all products in this category</p>
                  <button className="btn btn-green">View All</button>
                </div>
                <div className="category-card">
                  <h3>Analytics</h3>
                  <p>View sales and performance data</p>
                  <button className="btn btn-purple">View Stats</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <BarChart3 className="icon" />
          <h2>Admin Panel</h2>
        </div>
        <nav className="menu">
          <ul>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => setSelectedSlot(item.name)}
                    className={`menu-item ${
                      selectedSlot === item.name ? "active" : ""
                    }`}
                  >
                    <Icon className="menu-icon" size={20} />
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`main ${isSidebarOpen ? "shifted" : ""}`}>
        <header className="topbar">
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="admin-info">
            <div>
              <p className="admin-name">Admin User</p>
              <p className="admin-email">admin@example.com</p>
            </div>
            <div className="avatar">A</div>
          </div>
        </header>

        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Admin;