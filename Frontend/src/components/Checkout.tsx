import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { CartItem } from "../types";
import { Link } from "react-router-dom";

const API = "http://localhost:8000/api";

interface CheckoutProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function Checkout({ cart, setCart }: CheckoutProps) {
  const [receipt, setReceipt] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // checkout function that will give back a receipt
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/checkout`, { cartItems: cart });
      setReceipt(res.data);
      await axios.delete(`${API}/cart/deleteCart`);
      toast.success("Order Placed");
      setCart([]);
    } catch (err: any) {
      console.error("Checkout failed:", err.message);
      toast.error("Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {!receipt ? (
        <form
          onSubmit={handleCheckout}
          className="space-y-4 max-w-md w-full bg-white p-4 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2 text-gray-700"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{Number(item.price) * Number(item.quantity)}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold pt-2">
            <span>Total</span>
            <span>
              ₹
              {cart
                .reduce(
                  (sum, i) => sum + Number(i.price) * Number(i.quantity),
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-2">Receipt</h2>
          <p className="text-gray-700 mb-1">
            <strong>Receipt ID:</strong> {receipt.receiptId}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>User Email:</strong> {receipt.user?.email || "Mock User"}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Total:</strong> ₹{receipt.total.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Date:</strong>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
          <Link
            to={"/"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      )}
    </div>
  );
}
