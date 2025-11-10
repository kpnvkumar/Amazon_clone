import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderS from "./components/HeaderS";
import Homepage from "./pages/Homepage";
import Homeimprovements from "./pages/Homeimprovements";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Accounts from "./pages/Accounts";
import ItemDetails from "./pages/ItemDetails";
import UserContext from "./pages/UserContext";
import { useState, useEffect } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Wishlistdetails from "./pages/Wishlistdetails";
import WishlistPage from "./pages/WishlistPage";
import Toysandgames from "./pages/Toysandgames";
import MxPlayerPage from "./components/Mxplayer";
import Buynow  from "./pages/Buynow";
import Mobiles from "./pages/Mobiles";
import Homeandkitchen from "./pages/Homeandkitchen";
import Fashion from"./pages/Fashion";
import Electronics from './pages/Electronics';
import Books from './pages/Books';
import Bikes_cars from './pages/Bikes_cars';
import Sidebar from "./pages/Sidebar";
import Payments from "./pages/Payments";
function App() {
  const [products, setProducts] = useState(null);

  const FetchData = async () => {
    const data = new FormData();
    const response = await axios.post(
      "http://localhost:8000/get-products.php",
      data,
      { headers: { "content-type": "multipart/form-data" } }
    );
    if (response) {
      setProducts(response.data.products);
      console.log(response.data);
    }
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={products}>
        <BrowserRouter>
          <Header />
          <HeaderS />          
          <Routes>
            <Route path="/" element={<Homepage />} />
            {/* <Route path="/electronics" element={<Products />} /> */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/Wishlistdetails" element={<Wishlistdetails />} />
            <Route path="/Wishlistdetails" element={<WishlistPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/item-details/:product_id" element={<ItemDetails />} />
            <Route path="/mxplayer" element={<MxPlayerPage/>}/>
            <Route path="/buynow/:product_id" element={<Buynow/>}/>
            <Route path="/Homeimprovements" element={<Homeimprovements/>}/>
            <Route path="/Toysandgames" element={<Toysandgames/>}/>
            <Route path="/Mobiles" element={<Mobiles/>}/>
            <Route path="/Fashion" element={<Fashion/>}/>
            <Route path="/Homeandkitchen" element={<Homeandkitchen/>}/>
            <Route path="/Payments" element={<Payments/>}/>
            <Route path="/Electronics" element={<Electronics/>}/>
            <Route path="/Books" element={<Books/>}/>
            <Route path="/Bikes" element={<Bikes_cars/>}/>
            <Route path="/Sidebar" element={<Sidebar/>}/>
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/orders" element={<Orders />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
