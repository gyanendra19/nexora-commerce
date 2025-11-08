import { Link } from "react-router-dom";
import type { CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
}

export default function Navbar({ cart }: NavbarProps) {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        🛍️ Nexora Commerce
      </Link>

      <div className="space-x-6 flex items-center">
        <Link
          to="/"
          className="hover:text-blue-500 transition-colors duration-200"
        >
          Products
        </Link>

        <Link
          to="/cart"
          className="relative hover:text-blue-500 transition-colors duration-200"
        >
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
