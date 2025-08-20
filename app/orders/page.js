// app/orders/page.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import StarInput from "@/components/StarInput";
import useReviewModal from "@/store/useReviewModal";

export default function OrderHistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [userReviews, setUserReviews] = useState({}); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { clearCart, addToCart } = useCartStore();
  const { openModal: openReviewModal } = useReviewModal();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        try {
          const [ordersRes, reviewsRes] = await Promise.all([
            fetch("/api/orders"),
            fetch("/api/reviews/user"),
          ]);

          if (!ordersRes.ok) throw new Error("Failed to fetch orders.");
          if (!reviewsRes.ok) throw new Error("Failed to fetch reviews.");

          const ordersData = await ordersRes.json();
          const reviewsData = await reviewsRes.json();

          setOrders(ordersData.orders);
          setUserReviews(reviewsData.reviews); // Use the new 'reviews' key
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (status === "unauthenticated") {
        router.push("/");
      }
    };

    fetchData();
  }, [status, router]);

  const handleRepeatOrder = (items) => {
    clearCart();
    items.forEach((item) => {
      // The item from the order might not have all details, like description
      // For simplicity, we just add the core details. A more robust implementation
      // might fetch the full item details from a product list.
      const cartItem = { name: item.name, price: item.price };
      // Add the item to the cart according to its original quantity
      for (let i = 0; i < item.quantity; i++) {
        addToCart(cartItem);
      }
    });
    router.push("/cart");
  };

  const parsePrice = (price) => parseFloat(String(price).replace("₹", ""));

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your order history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffbf0] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Order History
        </h1>
        {error && <p className="text-center text-red-500">{error}</p>}

        {orders.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">
              You haven't placed any orders yet.
            </p>
            <Link href="/#menu">
              <button className="common-button">Start an Order</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <div>
                    <p className="font-semibold">
                      Order ID: #{order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{order.totalAmount.toFixed(2)}
                    </p>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200">
                  {order.items.map((item, index) => {
                    const review = userReviews ? userReviews[item.name] : null;
                    return (
                      <li
                        key={index}
                        className="flex flex-col sm:flex-row justify-between py-3"
                      >
                        <div className="mb-2 sm:mb-0">
                          <p>
                            {item.name}{" "}
                            <span className="text-gray-500">
                              x {item.quantity}
                            </span>
                          </p>
                          <p className="text-sm">
                            ₹
                            {(parsePrice(item.price) * item.quantity).toFixed(
                              2
                            )}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <StarInput
                            item={item}
                            existingRating={review?.rating} // Pass the rating from the review object
                          />
                          {review?.comment ? (
                            <span className="text-sm text-green-600 font-semibold">
                              Reviewed
                            </span>
                          ) : (
                            <button
                              onClick={() => openReviewModal(item)}
                              className="text-sm text-amber-800 hover:underline"
                            >
                              Write a review
                            </button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="text-right mt-4">
                  <button
                    onClick={() => handleRepeatOrder(order.items)}
                    className="bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition"
                  >
                    Repeat Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
