// app/cart/page.js
"use client";

import useCartStore from "@/store/useCartStore";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from 'next/script';
import toast from "react-hot-toast";

export default function CartPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const cartItems = Object.values(items);

  const parsePrice = (price) => {
    return parseFloat(String(price).replace('₹', ''));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + parsePrice(item.price) * item.quantity;
  }, 0);

  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const makePayment = async () => {
    if (!session) {
      toast.error("Please log in to proceed.");
      return;
    }

    try {
      // 1. Call our API to create a Razorpay Order
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      if (!res.ok) {
        throw new Error("Failed to create Razorpay order.");
      }
      
      const { order } = await res.json();

      // 2. Configure and Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Coffee Heaven',
        description: 'Payment for your order',
        image: 'https://res.cloudinary.com/daxydcpj0/image/upload/v1755495806/cafe-logo_n3s2ld.png',
        order_id: order.id,
        handler: async function (response) {
          // 3. On successful payment, save the order to our own database
          const orderData = {
            items: cartItems,
            totalAmount: total,
          };
          
          const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderData),
          });
          
          if (!saveOrderRes.ok) {
            throw new Error("Failed to save your order. Please contact support.");
          }

          toast.success("Payment successful! Your order has been placed.");
          clearCart();
          router.push('/orders');
        },
        prefill: {
          name: session.user.name || '',
          email: session.user.email || '',
          contact: session.user.mobileNumber || '',
        },
        theme: {
          color: '#854d0e',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error('Payment failed:', error);
      toast.error(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="min-h-screen bg-[#fffbf0] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
              <Link href="/#menu">
                <button className="common-button">
                  Explore Menu
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-xl font-semibold">Items</h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.name} className="flex items-center justify-between py-4">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 border rounded-md p-1">
                          <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="px-2">-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="px-2">+</button>
                        </div>
                        <p className="font-semibold w-20 text-right">
                          ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                        </p>
                        <button onClick={() => removeFromCart(item.name)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹{subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax (5%)</p>
                    <p>₹{tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <p>Total</p>
                    <p>₹{total.toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  onClick={makePayment}
                  className="w-full mt-6 bg-amber-800 text-white py-2 rounded-md hover:bg-amber-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}





// // app/cart/page.js
// "use client";

// import useCartStore from "@/store/useCartStore";
// import Link from "next/link";
// import { Trash2 } from "lucide-react";

// export default function CartPage() {
//   const { items, updateQuantity, removeFromCart, clearCart } = useCartStore();
//   const cartItems = Object.values(items);

//   // Helper function to parse price string like "₹190" to a number
//   const parsePrice = (price) => {
//     return parseFloat(price.replace('₹', ''));
//   };

//   const subtotal = cartItems.reduce((acc, item) => {
//     return acc + parsePrice(item.price) * item.quantity;
//   }, 0);

//   const tax = subtotal * 0.05; // 5% tax
//   const total = subtotal + tax;

//   return (
//     <div className="min-h-screen bg-[#fffbf0] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Your Shopping Cart
//         </h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center">
//             <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
//             <Link href="/#menu">
//               <button className="common-button">
//                 Explore Menu
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Cart Items List */}
//             <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
//               <div className="flex justify-between items-center mb-4 border-b pb-2">
//                 <h2 className="text-xl font-semibold">Items</h2>
//                 <button 
//                   onClick={clearCart}
//                   className="text-sm text-red-500 hover:underline"
//                 >
//                   Clear All
//                 </button>
//               </div>
//               <ul className="divide-y divide-gray-200">
//                 {cartItems.map((item) => (
//                   <li key={item.name} className="flex items-center justify-between py-4">
//                     <div className="flex-1">
//                       <p className="font-semibold">{item.name}</p>
//                       <p className="text-gray-600 text-sm">{item.price}</p>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="flex items-center gap-2 border rounded-md p-1">
//                         <button onClick={() => updateQuantity(item.name, item.quantity - 1)} className="px-2">-</button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => updateQuantity(item.name, item.quantity + 1)} className="px-2">+</button>
//                       </div>
//                       <p className="font-semibold w-20 text-right">
//                         ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
//                       </p>
//                       <button onClick={() => removeFromCart(item.name)} className="text-red-500 hover:text-red-700">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Order Summary */}
//             <div className="bg-white p-6 rounded-lg shadow-md h-fit">
//               <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <p>Subtotal</p>
//                   <p>₹{subtotal.toFixed(2)}</p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p>Tax (5%)</p>
//                   <p>₹{tax.toFixed(2)}</p>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
//                   <p>Total</p>
//                   <p>₹{total.toFixed(2)}</p>
//                 </div>
//               </div>
//               <button className="w-full mt-6 bg-amber-800 text-white py-2 rounded-md hover:bg-amber-700 transition">
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }