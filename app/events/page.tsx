import { concerts } from "@/lib/data/concerts";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Browse Concerts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
  );
}
