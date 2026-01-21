"use client";
import Image from "next/image";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

type EventType = {
  _id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image?: string;
};

export default function OrganizerPanel() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
  title: "",
  date: "",
  location: "",
  price: "",
});

  const getBannerByTitle = (title: string) => {
    const name = title.toLowerCase();

    if (name.includes("arijit")) return "/images/banners/arijit-pune.jpg";
    if (name.includes("coldplay")) return "/images/banners/coldplay-mumbai.jpg";
    if (name.includes("honey")) return "/images/banners/honey-singh-mumbai.jpg";
    if (name.includes("ed sheeran") || name.includes("ed")) return "/images/banners/ed-sheeran-india.jpg";
    if (name.includes("ap dhillon") || name.includes("ap")) return "/images/banners/ap-dhillon-night-drive.jpg";
    if (name.includes("justin")) return "/images/banners/justin-bieber-mumbai.jpg";
    if (name.includes("indie")) return "/images/banners/indie-night-mumbai.jpg";
    if (name.includes("sunset")) return "/images/banners/sunset-edm-goa.jpg";
    if (name.includes("techno")) return "/images/banners/techno-night-goa.jpg";

    return "/images/banners/arijit-pune.jpg"; // default fallback
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
    setLoading(false);
  };

 const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

 const createEvent = async (e: FormEvent) => {
  e.preventDefault();

  const payload = {
    title: form.title,
    date: form.date,
    location: form.location,
    price: form.price,
    image: getBannerByTitle(form.title), // auto banner
  };

  const res = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    toast.success("🎉 Event created successfully");
    setShowModal(false);
    setForm({ title: "", date: "", location: "", price: "" });
    fetchEvents();
  }
};

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.success("Event deleted");
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">🎤 Organizer Panel</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            + Create Event
          </button>
        </div>

        {/* Events */}
        {loading ? (
          <p className="text-center text-gray-400">Loading events...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition"
              ><div className="relative h-56 w-full">
  <Image
    src={getBannerByTitle(event.title)}
    alt={event.title}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    className="object-cover"
  />
</div>



<div className="p-5">
  <h3 className="text-xl font-semibold">{event.title}</h3>
  <p className="text-gray-300">📍 {event.location}</p>
  <p className="text-gray-300">📅 {event.date}</p>
  <p className="text-purple-400 font-bold mt-2">₹{event.price}</p>

  <button
    onClick={() => deleteEvent(event._id)}
    className="mt-4 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
  >
    Delete Event
  </button>
</div>

              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Create New Event</h2>

          <form onSubmit={createEvent} className="space-y-4">
  <input name="title" placeholder="Title" className="input" onChange={handleChange} />
  <input name="date" type="date" className="input" onChange={handleChange} />
  <input name="location" placeholder="Location" className="input" onChange={handleChange} />
  <input name="price" placeholder="Price" className="input" onChange={handleChange} />

  <div className="flex justify-end gap-3">
    <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
      Cancel
    </button>
    <button className="btn-primary">Create</button>
  </div>
</form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
