import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/features/Cart/CartSlice";
import { getBaseUrl } from "../../../utils/baseURL";
import { money } from "../../../utils/currency";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/products/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const data = await res.json();
        setProduct(data?.product || data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="py-16 text-center">Loading…</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 grid md:grid-cols-2 gap-8">
      <img
        src={product.image ?? product.images?.[0]}
        alt={product.name}
        className="w-full rounded-lg"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-2 opacity-70">{product.description}</p>
        <div className="mt-4 text-xl">{money(product.price)}</div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-6 px-5 py-3 rounded bg-rose-500 text-white hover:bg-rose-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
