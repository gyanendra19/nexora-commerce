import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import type { CartItem } from "./types";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const API = "http://localhost:8000/api";

  const fetchCart = async () => {
    const res = await axios.get(`${API}/cart/getCart`);
    setCart(res.data.cart);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<Products fetchCart={fetchCart} />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} fetchCart={fetchCart} total={total} />}
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
