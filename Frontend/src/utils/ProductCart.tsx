import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:8000/api";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
  fetchCart: () => void;
}

export default function ProductCard({ fetchCart, product }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await axios.post(`${API}/cart/addToCart`, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
      }); // add item to the cart
      toast.success("Item added to cart");
      fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart");
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200">
      <img
        src={
          product.image || "https://placehold.co/300x200/png?text=Product+Image"
        }
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
        onError={(e) => {
          e.currentTarget.src = "/download.png";
        }}
      />
      <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">₹{product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseQty}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
          >
            −
          </button>
          <span className="text-md font-medium">{qty}</span>
          <button
            onClick={increaseQty}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
