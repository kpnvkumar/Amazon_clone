import { Link } from 'react-router-dom';

function Wishlistdetails({ items }) {
  return (
    <div className="wishlist-container">
      {items.map((item) => (
        <div key={item.product_id} className="wishlist-card">
          <img src={item.image_url} alt={item.name} className="wishlist-image" />
          <h4>{item.name}</h4>
          <p>₹{item.price}</p>
          <Link to={`/item-details/${item.product_id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Wishlistdetails;
