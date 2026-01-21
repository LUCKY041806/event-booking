import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  banner: string;
  artist: string;
  date: string;
  time: string;
  location: string;
}

export default function EventCard({
  title,
  banner,
  artist,
  date,
  time,
  location,
}: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={banner}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>

        <p className="text-sm text-gray-600 mt-1">🎤 {artist}</p>
        <p className="text-sm mt-1">📅 {date} • {time}</p>
        <p className="text-sm text-gray-500">📍 {location}</p>

       <Link
  href={`/book/${encodeURIComponent(title)}`}
  className="block text-center mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl hover:opacity-90"
>
  Book Now
</Link>
      </div>

    </div>
  );
}
