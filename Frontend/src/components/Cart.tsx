import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import type { CartItem } from "../types";
import { toast } from "react-toastify";

const API = "http://localhost:8000/api";

interface CartProps {
  cart: CartItem[];
  fetchCart: () => void;
  total: number;
}

export default function Cart({ cart, fetchCart, total }: CartProps) {
  const removeItem = async (id: string) => {
    await axios.delete(`${API}/cart/${id}`);
    toast.success("Item removed");
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          🛒 Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-6">
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between items-center py-4 gap-2"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
                    <span className="font-medium text-gray-700 text-lg">
                      {item.name}
                    </span>
                    <span className="text-gray-500">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-800 font-semibold text-lg">
                      ${Number(item.price) * Number(item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item._id!)}
                      className="text-red-500 hover:text-red-700 font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4 text-xl font-semibold text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-center mt-6">
              <Link
                to="/checkout"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition transform hover:scale-105 font-medium shadow-md"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
