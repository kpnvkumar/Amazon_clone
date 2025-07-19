// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Qr from "../images/Qr.jpg";

// function Buynow() {
//   const [details, setDetails] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [transactionId, setTransactionId] = useState("");
//   const [address, setAddress] = useState("");
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const { product_id } = useParams();
//   const user_id = localStorage.getItem("user_id");

//   const handleTransactionSubmit = () => {
//     if (transactionId.trim() === "") {
//       alert("Please enter a transaction ID.");
//       return;
//     }

//     if (address.trim() === "") {
//       alert("Please enter your delivery address.");
//       return;
//     }

//     alert(`Transaction submitted:\nTransaction ID: ${transactionId}\nQuantity: ${quantity}\nAddress: ${address}`);
//     setTransactionId("");
//     setAddress("");
//   };

//   const FetchData = async () => {
//     const data = new FormData();
//     data.append("user_id", user_id);
//     try {
//       const response = await axios.post("http://localhost:8000/get-carts.php", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       if (response?.data?.data) {
//         setCartItems(response.data.data);
//         setTotalAmount(response.data.total_amount);
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = new FormData();
//       data.append("product_id", product_id);
//       try {
//         const response = await axios.post(
//           "http://localhost:8000/get-product-details.php",
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         if (response?.data?.product_data) {
//           setDetails(response.data.product_data);
//         } else {
//           alert("Product not found.");
//         }
//       } catch (err) {
//         console.error("Error fetching product details:", err);
//         alert("Failed to load product details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [product_id]);

//   useEffect(() => {
//     FetchData();
//   }, [user_id]);

//   if (loading) return <div className="text-center mt-4">Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <div className="row align-items-center">
//         <div className="col-md-6 text-center mb-4 mb-md-0">
//           <img
//             src={details.images}
//             alt={details.name}
//             className="img-fluid border rounded"
//             style={{ maxHeight: "400px", objectFit: "contain" }}
//           />
//         </div>

//         <div className="col-md-6">
//           <h3 className="card-title">{details.name}</h3>
//           <p className="card-text">{details.description}</p>
//           <p className="card-text fw-bold fs-5">Price: ₹{details.price}</p>

//           {/* Quantity Input */}
//           <div className="d-flex align-items-center my-2">
//             <button
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//             >
//               -
//             </button>
//             <input
//               type="number"
//               min="1"
//               className="form-control mx-2 text-center"
//               style={{ width: "60px" }}
//               value={quantity}
//               onChange={(e) => {
//                 const val = parseInt(e.target.value);
//                 if (!isNaN(val) && val >= 1) {
//                   setQuantity(val);
//                 }
//               }}
//             />
//             <button
//               className="btn btn-outline-secondary btn-sm"
//               onClick={() => setQuantity((prev) => prev + 1)}
//             >
//               +
//             </button>
//           </div>

//           <div className="my-4">
//             <h5>Scan to Pay</h5>
//             <img
//               src={Qr}
//               alt="QR Code"
//               className="img-fluid"
//               style={{ maxWidth: "200px" }}
//             />
//           </div>

//           {/* ✅ Address field (Before transaction ID) */}
//           <div className="mt-4">
//             <label htmlFor="address"><strong>Delivery Address:</strong></label>
//             <textarea
//               id="address"
//               className="form-control mt-2"
//               rows="3"
//               placeholder="Enter your delivery address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>

//           {/* ✅ Transaction ID field */}
//           <div className="mt-4">
//             <label htmlFor="transactionId"><strong>Transaction ID:</strong></label>
//             <textarea
//               id="transactionId"
//               className="form-control mt-2"
//               rows="3"
//               placeholder="Enter your transaction ID"
//               value={transactionId}
//               onChange={(e) => setTransactionId(e.target.value)}
//             />
//             <button
//               className="btn btn-primary mt-3"
//               onClick={handleTransactionSubmit}
//             >
//               Submit Transaction
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="text-end mt-4">
//         <h5>Total Amount: ₹{quantity * details.price}</h5>
//       </div>
//     </div>
//   );
// }

// export default Buynow;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Qr from "../images/Qr.jpg";

function Buynow() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { product_id } = useParams();
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate(); 
  useEffect(() => {
    (async () => {
      const data = new FormData();
      data.append("product_id", product_id);
      try {
         const user_id = localStorage.getItem("user_id");
    if (!user_id || user_id === "null") {
      window.location.href = "/login";
    }
        const res = await axios.post(
          "http://localhost:8000/get-product-details.php",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (res.data.product_data) setDetails(res.data.product_data);
        else alert("Product not found.");
      } catch {
        alert("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [product_id]);

  const handleTransactionSubmit = async () => {
    if (!transactionId.trim()) {
      alert("Please enter a transaction ID.");
      return;
    }
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    // prepare payload
    const form = new FormData();
    form.append("user_id", user_id);
    form.append("product_id", product_id);
    form.append("quantity", quantity);
    form.append("price",details.price);
    form.append("transaction_id", transactionId);
    form.append("address", address);
    form.append("amount",quantity*details.price);

    try {
      const res = await axios.post(
        "http://localhost:8000/insert-order.php",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        navigate("/");
      } else {
        console.log(res);
        alert(res.data.message || "Submission failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting transaction.");
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        {/* Product Image */}
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={details.images}
            alt={details.name}
            className="img-fluid border rounded"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h3 className="card-title">{details.name}</h3>
          <p className="card-text">{details.description}</p>
          <p className="card-text fw-bold fs-5">Price: ₹{details.price}</p>

          {/* Quantity */}
          <div className="d-flex align-items-center my-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              className="form-control mx-2 text-center"
              style={{ width: "60px" }}
              value={quantity}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v >= 1) setQuantity(v);
              }}
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          {/* QR */}
          <div className="my-4 text-center">
            <h5>Scan to Pay</h5>
            <img
              src={Qr}
              alt="QR Code"
              className="img-fluid"
              style={{ maxWidth: "200px" }}
            />
          </div>

          {/* Address */}
          <div className="mt-4">
            <label htmlFor="address"><strong>Delivery Address:</strong></label>
            <textarea
              id="address"
              className="form-control mt-2"
              rows="3"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Transaction ID & Submit */}
          <div className="mt-4">
            <label htmlFor="transactionId"><strong>Transaction ID:</strong></label>
            <textarea
              id="transactionId"
              className="form-control mt-2"
              rows="2"
              placeholder="Enter your transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
            <button
              className="btn btn-primary mt-3"
              onClick={handleTransactionSubmit}
            >
              Submit Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="text-end mt-4">
        <h5>Total Amount: ₹{quantity * details.price}</h5>
      </div>
    </div>
  );
}

export default Buynow;
