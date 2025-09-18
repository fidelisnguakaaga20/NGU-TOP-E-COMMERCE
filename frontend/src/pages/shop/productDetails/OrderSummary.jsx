import React from "react";
import { useSelector } from "react-redux";

const money = (n) => `$${Number(n || 0).toFixed(2)}`;

const OrderSummary = () => {
  const items = useSelector((s) => s.cart?.items) || [];

  const subtotal = items.reduce(
    (sum, i) => sum + (Number(i.price) || 0) * (Number(i.qty) || 0),
    0
  );

  // tweak these rules as you like
  const shipping = items.length ? 0 : 0;
  const taxRate = 0; // e.g. 0.075 for 7.5%
  const tax = subtotal * taxRate;

  const total = subtotal + shipping + tax;

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{money(shipping)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax</span>
        <span>{money(tax)}</span>
      </div>
      <div className="border-t pt-2 flex justify-between font-semibold">
        <span>Total</span>
        <span>{money(total)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
