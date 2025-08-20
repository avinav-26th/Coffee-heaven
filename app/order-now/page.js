'use client';

import { useState } from 'react';

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
    items: [
      { name: 'Espresso', quantity: 1, price: 3.5 },
      { name: 'Latte', quantity: 2, price: 4.0 },
    ],
  });

  const totalAmount = formData.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Delivery Address" className="w-full p-2 border rounded"></textarea>
        
        <h3 className="text-xl font-semibold mt-4">Order Summary</h3>
        <ul className="bg-white p-4 rounded shadow">
          {formData.items.map((item, index) => (
            <li key={index} className="flex justify-between py-1">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold">Total: ${totalAmount.toFixed(2)}</p>
        
        <h3 className="text-xl font-semibold mt-4">Payment Method</h3>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="cash">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit Order</button>
      </form>
    </div>
  );
}
