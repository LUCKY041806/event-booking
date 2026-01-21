import { concerts } from "@/lib/data/concerts";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">🎟 Browse Concerts</h1>
          <p className="text-gray-400 text-lg">
            Book concerts, shows and festivals happening near you
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {concerts.map(show => (
            <EventCard
              key={show.id}
              title={show.title}
              banner={show.banner}
              artist={show.artist}
              date={show.date}
              time={show.time}
              location={show.location}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
