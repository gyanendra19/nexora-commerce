import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types";
import ProductCard from "../utils/ProductCart";

const API = "http://localhost:8000/api";

interface ProductsProp {
  fetchCart: () => void;
}

export default function Products({ fetchCart }: ProductsProp) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${API}/products`) // fetch all products
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            fetchCart={fetchCart}
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
