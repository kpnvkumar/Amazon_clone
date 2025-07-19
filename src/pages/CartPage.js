import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import {Link} from 'react-router-dom';

function CartPage() {
  if (!localStorage.getItem("user_id") || localStorage.getItem("user_id") === 'null') {
    window.location.replace("/login");
  }

  const user_id = localStorage.getItem("user_id");
  const [items, changeProducts] = useState(null);
  const [total_amount, addAmount] = useState(0);
  const FetchData = async () => {
    const data = new FormData();
    data.append("user_id", user_id);
    const response = await axios.post("http://localhost:8000/get-carts.php", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response) {
      changeProducts(response.data.data);
      addAmount(response.data.total_amount);
    }
  };

  const Removedata = async (cart_id) => {
    const data = new FormData();
    data.append('cart_id', cart_id);
    await axios.post("http://localhost:8000/delete-cart.php", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    FetchData();
  };

  const updateQuantity = async (cart_id, newQty) => {
    if (newQty < 1) return;

    const data = new FormData();
    data.append('cart_id', cart_id);
    data.append('quantity', newQty);

    await axios.post("http://localhost:8000/update-cart.php", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    FetchData();
  };

  useEffect(() => {
    FetchData();
  }, [user_id]);

  return (
    <div className='cartpage'>
      <div className='outer-outer-bag'>
        <div className='Outerbag'>
          <h3 className='header-cartpage'>Shopping cart</h3>
          <div style={{ overflowX: 'auto' }}>
            {items ? items.map((item) => (
              <div key={item.cart_id} className='bag d-flex flex-row' style={{ minWidth: '600px' }}>
                <div className='cover-div'>
                  <img src={item.images} className="cover" alt='cover-image' />
                </div>
                <div className='content-div ms-3'>
                  <h5 className='lines-2'>{item.name}</h5>
                  <h6>{item.description}</h6>
                  <div className='d-flex price-tag'>
                    <p>₹{item.price}</p>
                    <p><s>₹{item.cutoff_price}</s></p>
                    <p className='text-danger'>{item.discount}% OFF</p>
                  </div>
                  <Rating readOnly defaultValue={item.rating} precision={0.5} />
                  {/* Quantity Controller */}
                  <div className='buynowdiscard d-flex align-items-center gap-2'>
                  <Link to={`/Buynow/${item.product_id}`} className="btn btn-warning me-2"> Buy Now</Link>

  <div className='quantity-bar d-flex align-items-center border rounded px-2'>
    <button
      className='btn btn-outline-secondary btn-sm'
      onClick={() => updateQuantity(item.cart_id, parseInt(item.quantity) - 1)}
    >-</button>
    <span className='px-2'>{item.quantity}</span>
    <button
      className='btn btn-outline-secondary btn-sm'
      onClick={() => updateQuantity(item.cart_id, parseInt(item.quantity) + 1)}
    >+</button>
  </div>

  <button
    onClick={() => Removedata(item.cart_id)}
    className='btn btn-danger'
  >Discard</button>
</div>

                </div>
              </div>
            )) : <div><p><b>No items in cart</b></p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
