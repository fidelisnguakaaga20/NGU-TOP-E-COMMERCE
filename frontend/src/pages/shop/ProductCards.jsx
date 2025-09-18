import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/Cart/CartSlice";
import { money } from "../../utils/currency";

const ProductCards = ({ products = [] }) => {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    // send the full product; CartSlice will normalize id/price/image
    dispatch(addToCart(product));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p._id ?? p.id} className="rounded-lg border p-4 bg-white">
          <img
            src={p.image ?? p.images?.[0]}
            alt={p.name}
            className="h-40 w-full object-cover rounded"
          />
          <div className="mt-3 font-medium">{p.name}</div>
          <div className="text-sm opacity-70">{money(p.price)}</div>
          <button
            onClick={() => handleAdd(p)}
            className="mt-3 px-4 py-2 rounded bg-rose-500 text-white hover:bg-rose-600"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
