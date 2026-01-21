"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
        pathname === href
          ? "bg-indigo-600 text-white shadow-lg"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-wide">
          🎟 EventBook
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {navItem("/", "Home")}
          {navItem("/events", "Events")}
          {navItem("/bookings", "My Bookings")}
          {navItem("/organizer", "Organizer")}
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col items-center gap-4 py-6">
            {navItem("/", "Home")}
            {navItem("/events", "Events")}
            {navItem("/bookings", "My Bookings")}
            {navItem("/organizer", "Organizer")}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-2 rounded-xl shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
