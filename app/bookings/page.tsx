"use client";

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  eventName: string;
  generalQty: number;
  vipQty: number;
  vvipQty: number;
  totalTickets: number;
  totalPrice: number;
  createdAt: string;
}

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking function
  const cancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await fetch("/api/bookings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // Update UI after delete
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Cancel booking failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl text-black rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📜 Booking History
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-3 text-left">Event</th>
                  <th className="p-3">General</th>
                  <th className="p-3">VIP</th>
                  <th className="p-3">VVIP</th>
                  <th className="p-3">Tickets</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-100"
                  >
                    <td className="p-3">{booking.eventName}</td>
                    <td className="p-3 text-center">{booking.generalQty}</td>
                    <td className="p-3 text-center">{booking.vipQty}</td>
                    <td className="p-3 text-center">{booking.vvipQty}</td>
                    <td className="p-3 text-center">
                      {booking.totalTickets}
                    </td>
                    <td className="p-3 text-center font-semibold">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      {new Date(booking.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
