"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const params = useParams();
  const eventParam = params.event;
  const eventName = Array.isArray(eventParam)
    ? decodeURIComponent(eventParam[0])
    : decodeURIComponent(eventParam || "");

  const [generalQty, setGeneralQty] = useState(0);
  const [vipQty, setVipQty] = useState(0);
  const [vvipQty, setVvipQty] = useState(0);
  const [success, setSuccess] = useState(false);

  // Countdown timer (5 minutes)
  const [timeLeft, setTimeLeft] = useState(300);

  const prices = {
    General: 999,
    VIP: 1999,
    VVIP: 3499,
  };

  const totalPrice =
    generalQty * prices.General +
    vipQty * prices.VIP +
    vvipQty * prices.VVIP;

  const totalTickets = generalQty + vipQty + vvipQty;

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
const handleBooking = async () => {
  if (totalTickets === 0) {
    alert("Please select at least one ticket.");
    return;
  }

  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        generalQty,
        vipQty,
        vvipQty,
        totalTickets,
        totalPrice,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
    } else {
      alert("Booking failed. Please try again.");
    }
  } catch (error) {
    console.error("Booking Error:", error);
    alert("Server error. Try again.");
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white flex justify-center items-center p-6">

      <div className="animate-fadeIn bg-white/90 backdrop-blur-xl text-black rounded-3xl shadow-2xl max-w-xl w-full p-8 border border-white/20">

        <h1 className="text-3xl font-bold mb-2 text-center">🎫 Book Tickets</h1>
        <p className="text-center text-gray-600 mb-4">{eventName}</p>

        {!success ? (
          <>
            {/* Countdown */}
            <div className="bg-red-100 text-red-700 text-center py-2 rounded-lg mb-4 font-semibold">
              ⏳ Complete your booking in {formatTime(timeLeft)} minutes
            </div>

            {/* Limited seats */}
            <div className="bg-yellow-100 text-yellow-800 text-center py-2 rounded-lg mb-6 font-semibold">
              🔥 Only few seats left — book now!
            </div>

            {/* Ticket Selection */}
            <div className="space-y-5 mb-6">

              <TicketRow
                title="General"
                price={prices.General}
                qty={generalQty}
                setQty={setGeneralQty}
              />

              <TicketRow
                title="VIP"
                price={prices.VIP}
                qty={vipQty}
                setQty={setVipQty}
              />

              <TicketRow
                title="VVIP"
                price={prices.VVIP}
                qty={vvipQty}
                setQty={setVvipQty}
              />
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 mb-6 shadow-lg">
              <h3 className="font-bold text-lg mb-2">🎟 Booking Summary</h3>
              <p className="text-sm">General: {generalQty}</p>
              <p className="text-sm">VIP: {vipQty}</p>
              <p className="text-sm">VVIP: {vvipQty}</p>
              <p className="text-sm mt-2">Total Tickets: {totalTickets}</p>
              <p className="text-sm font-bold mt-2">Total: ₹{totalPrice}</p>
            </div>

            <button
  onClick={handleBooking}
  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl"
>
  Confirm Booking
</button>


            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
              <span>🔒 Secure Payment</span>
              <span>🎟 Verified Tickets</span>
              <span>📞 24x7 Support</span>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Booking Confirmed!
            </h2>
            <p className="mb-2"><strong>Event:</strong> {eventName}</p>
            <p className="mb-2">General Tickets: {generalQty}</p>
            <p className="mb-2">VIP Tickets: {vipQty}</p>
            <p className="mb-2">VVIP Tickets: {vvipQty}</p>
            <p className="mb-4"><strong>Total Paid:</strong> ₹{totalPrice}</p>

            <p className="text-gray-600">Enjoy your event! 🎶🎭</p>
          </div>
        )}

      </div>

    </div>
  );
}

/* Ticket Row Component */
function TicketRow({
  title,
  price,
  qty,
  setQty,
}: {
  title: string;
  price: number;
  qty: number;
  setQty: (value: number) => void;
}) {
  return (
    <div className="flex justify-between items-center border rounded-xl p-4 hover:shadow-md transition">

      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">₹{price}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setQty(Math.max(0, qty - 1))}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          −
        </button>

        <span className="text-lg font-bold w-6 text-center">{qty}</span>

        <button
          onClick={() => setQty(qty + 1)}
          className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          +
        </button>
      </div>

    </div>
  );
}
