import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartSubtotal,
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/features/Cart/CartSlice.jsx";
import { money } from "../../utils/currency";

// Parse env tax/shipping
const parseTaxRate = () => {
  const raw = import.meta.env.VITE_TAX_RATE ?? 0.075; // default 7.5%
  let rate = Number(raw);
  if (Number.isNaN(rate)) rate = 0.075;
  if (rate > 1) rate = rate / 100; // allow "7.5" to mean 7.5%
  return Math.max(0, rate);
};
const TAX_RATE = parseTaxRate();
const SHIPPING_FLAT = Number(import.meta.env.VITE_SHIPPING_FLAT ?? 0);

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  const itemCount = items.reduce((t, i) => t + i.quantity, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + SHIPPING_FLAT + tax).toFixed(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* panel */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Your Cart <span className="opacity-60">({itemCount})</span>
          </h2>
          <button onClick={onClose} aria-label="Close" className="text-2xl">×</button>
        </div>

        {/* items */}
        <div className="divide-y">
          {items.length === 0 ? (
            <p className="p-6 text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="p-6 flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{money(item.price)} each</p>

                  <div className="mt-2 flex items-center gap-3">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                    >
                      –
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => dispatch(updateQuantity({ id: item.id, delta: +1 }))}
                    >
                      +
                    </button>

                    <button
                      className="ml-4 text-red-600 hover:underline"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="font-medium">
                  {money(item.price * item.quantity)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* summary */}
        <div className="p-6 border-t space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{money(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{money(SHIPPING_FLAT)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax ({(TAX_RATE * 100).toFixed(1)}%)</span>
            <span>{money(tax)}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg">
            <span className="font-semibold">Total</span>
            <span className="font-bold">{money(total)}</span>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              className="text-sm text-gray-600 hover:underline"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
            <button className="bg-black text-white px-5 py-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CartModal;
