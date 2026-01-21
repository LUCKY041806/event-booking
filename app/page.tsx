import EventCard from "@/components/EventCard";
import { concerts } from "@/lib/data/concerts";
import { comedyShows } from "@/lib/data/comedyShows";

import Link from "next/link";

export default function HomePage() {
  const featuredShows = concerts.filter(show => show.featured);
  const upcomingShows = concerts.filter(show => !show.featured);

  return (
    <main className="bg-gradient-to-br from-black via-slate-900 to-black text-white min-h-screen">


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
  <div className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 rounded-3xl text-center p-10 md:p-16 shadow-2xl overflow-hidden">

    <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/20 rounded-full blur-3xl"></div>

          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Book Your Favorite Concerts
          </h1>
          <p className="mb-6 text-sm md:text-base">
            Live music • Stadium tours • Club nights
          </p>

          
    <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10"><div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
<div className="absolute -bottom-20 -right-20 w-72 h-72 bg-black/20 rounded-full blur-3xl"></div>

            <Link href="/events" className="bg-black px-6 py-3 rounded-lg">
              Browse Events
            </Link>
            <Link href="/organizer" className="bg-white text-black px-6 py-3 rounded-lg">
              Organizer Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Shows */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 tracking-wide">
  🌟 Featured Shows
</h2>
<div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent mb-12"></div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShows.map(show => (
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
      </section>
      
<div className="max-w-7xl mx-auto px-4">
  <hr className="border-gray-800 my-10" />
</div>

      {/* Upcoming Shows */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">📅 Upcoming Shows</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingShows.map(show => (
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
      </section>  

      <div className="max-w-7xl mx-auto px-4">
  <hr className="border-gray-800 my-10" />
</div>

<section className="max-w-7xl mx-auto px-4 py-10">
<h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
  😂 Comedy Shows
  <span className="text-sm bg-indigo-600 px-3 py-1 rounded-full">Live</span>
</h2>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    <EventCard
      title="Zakir Khan – Mannpasand"
      banner="/images/comedy/zakir-khan.jpg"
      artist="Zakir Khan"
      date="15 March 2026"
      time="8:00 PM"
      location="Mumbai, Maharashtra"
    />

    <EventCard
      title="Bassi – Bas Kar Bassi"
      banner="/images/comedy/anubhav-singh-bassi.jpg"
      artist="Anubhav Singh Bassi"
      date="22 March 2026"
      time="7:30 PM"
      location="Delhi"
    />

    <EventCard
      title="Amit Tandon – Family Tandoncies"
      banner="/images/comedy/amit-tandon.jpg"
      artist="Amit Tandon"
      date="5 April 2026"
      time="6:30 PM"
      location="Pune, Maharashtra"
    />

    <EventCard
      title="Vir Das – Mind Fool Tour"
      banner="/images/comedy/vir-das.jpg"
      artist="Vir Das"
      date="18 April 2026"
      time="9:00 PM"
      location="Bangalore, Karnataka"
    />

    <EventCard
      title="Rahul Subramanian Live"
      banner="/images/comedy/rahul-subramanian.jpg"
      artist="Rahul Subramanian"
      date="2 May 2026"
      time="7:00 PM"
      location="Hyderabad"
    />
    <EventCard
  title="Kapil Sharma Live Comedy Night"
  banner="/images/comedy/kapil-sharma.jpg"
  artist="Kapil Sharma"
  date="10 May 2026"
  time="8:30 PM"
  location="Chandigarh, Punjab"
/>


  </div>
</section>

<div className="max-w-7xl mx-auto px-4">
  <hr className="border-gray-800 my-10" />
</div>

<section className="max-w-7xl mx-auto px-4 py-10">
  <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2">
    🎶 Qawwali Nights
    <span className="text-sm bg-emerald-600 px-3 py-1 rounded-full">Spiritual</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    <EventCard
      title="Rahat Fateh Ali Khan – Live Qawwali Night"
      banner="/images/qawwali/rahat-fateh-ali-khan.jpg"
      artist="Rahat Fateh Ali Khan"
      date="20 May 2026"
      time="8:00 PM"
      location="Delhi"
    />

    <EventCard
      title="Nusrat Fateh Ali Khan Tribute Night"
      banner="/images/qawwali/nusrat-fateh-ali-khan.jpg"
      artist="Nusrat Fateh Ali Khan"
      date="28 May 2026"
      time="7:30 PM"
      location="Mumbai, Maharashtra"
    />

    <EventCard
      title="Sabri Brothers – Qawwali Mehfil"
      banner="/images/qawwali/sabri-brothers.jpg"
      artist="Sabri Brothers"
      date="5 June 2026"
      time="9:00 PM"
      location="Hyderabad"
    />

    <EventCard
      title="Amjad Sabri – Sufi Qawwali Night"
      banner="/images/qawwali/amjad-sabri.jpg"
      artist="Amjad Sabri"
      date="12 June 2026"
      time="8:30 PM"
      location="Jaipur, Rajasthan"
    />

    <EventCard
      title="Farid Uddin Qawwal – Sufi Mehfil"
      banner="/images/qawwali/farid-uddin-qawwal.jpg"
      artist="Farid Uddin Qawwal"
      date="20 June 2026"
      time="7:00 PM"
      location="Lucknow, Uttar Pradesh"
    />
<EventCard
  title="Rahat Fateh Ali Khan – Sufi Special Night"
  banner="/images/qawwali/rahat-sufi-night.jpg"
  artist="Rahat Fateh Ali Khan"
  date="28 June 2026"
  time="9:00 PM"
  location="Bhopal, Madhya Pradesh"
/>

  </div>
</section>

    </main>
  );
}
